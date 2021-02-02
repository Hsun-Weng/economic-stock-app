package com.hsun.chat.service.impl;

import com.google.gson.Gson;
import com.hsun.chat.bean.*;
import com.hsun.chat.constants.PostbackFunction;
import com.hsun.chat.resource.StockInfoResource;
import com.hsun.chat.resource.StockResource;
import com.hsun.chat.service.StockMessageService;
import com.hsun.chat.util.FlexUtil;
import com.linecorp.bot.model.action.DatetimePickerAction;
import com.linecorp.bot.model.action.MessageAction;
import com.linecorp.bot.model.message.flex.component.Box;
import com.linecorp.bot.model.message.flex.component.Text;
import com.linecorp.bot.model.message.flex.container.Bubble;
import com.linecorp.bot.model.message.flex.container.Carousel;
import com.linecorp.bot.model.message.flex.unit.FlexDirection;
import com.linecorp.bot.model.message.flex.unit.FlexLayout;
import com.linecorp.bot.model.message.flex.unit.FlexMarginSize;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StockMessageServiceImpl implements StockMessageService {

    @Autowired
    private StockResource stockResource;

    @Autowired
    private StockInfoResource stockInfoResource;

    @Autowired
    private FlexUtil flexUtil;

    @Autowired
    private Gson gson;

    @Override
    public Bubble getStockMenuBubble(){
        final LocalDate today = ZonedDateTime.now(ZoneId.of("Asia/Taipei")).toLocalDate();
        return Bubble.builder()
                .size(Bubble.BubbleSize.KILO)
                .direction(FlexDirection.LTR)
                .header(Box.builder()
                        .layout(FlexLayout.VERTICAL)
                        .backgroundColor(flexUtil.getBackgroundColor())
                        .contents(flexUtil.getHeaderText().toBuilder()
                                .text("查詢個股資訊")
                                .build()
                        ).build())
                .body(Box.builder()
                        .layout(FlexLayout.VERTICAL)
                        .spacing(FlexMarginSize.MD)
                        .backgroundColor(flexUtil.getBackgroundColor())
                        .contents(flexUtil.getContentButton().toBuilder()
                                .action(new MessageAction("範例：2330", "查詢個股 2330"))
                                .build())
                        .build())
                .build();
    }

    @Override
    public Bubble getStockInfoBubble(String stockCode) {
        StockBean stockBean = stockInfoResource.getStock(stockCode);
        final LocalDate today = ZonedDateTime.now(ZoneId.of("Asia/Taipei")).toLocalDate();
        return Bubble.builder()
                .size(Bubble.BubbleSize.NANO)
                .direction(FlexDirection.LTR)
                .header(Box.builder()
                        .layout(FlexLayout.VERTICAL)
                        .backgroundColor(flexUtil.getBackgroundColor())
                        .contents(flexUtil.getHeaderText().toBuilder()
                                .text("股票")
                                .build()
                        ).build())
                .body(Box.builder()
                        .layout(FlexLayout.VERTICAL)
                        .backgroundColor(flexUtil.getBackgroundColor())
                        .contents(flexUtil.getContentText().toBuilder()
                                .text(stockBean.getStockCode())
                                .build(),
                                flexUtil.getContentText().toBuilder()
                                        .text(stockBean.getStockName())
                                        .build())
                        .build())
                .footer(Box.builder()
                        .layout(FlexLayout.VERTICAL)
                        .backgroundColor(flexUtil.getBackgroundColor())
                        .contents(flexUtil.getContentButton().toBuilder()
                                .action(DatetimePickerAction.OfLocalDate
                                        .builder()
                                        .initial(today)
                                        .label("查詢")
                                        .data(gson.toJson(new PostbackFunctionBean(PostbackFunction.STOCK.getValue()
                                                , stockBean.getStockCode())))
                                        .min(today.minus(Period.ofMonths(1)))//最多回溯一個月前
                                        .max(today)
                                        .build())
                                .build())
                        .build())
                .build();
    }

    @Override
    public Carousel getStockCarousel(LocalDate queryDate, String stockCode){
        List<Bubble> bubbleList = new ArrayList<>(3);
        try{//價格
            bubbleList.add(getStockPriceBubble(queryDate, stockCode));
        }catch(Exception e){
            e.printStackTrace();
        }
        try{//法人進出
            bubbleList.add(getStockChipBubble(queryDate, stockCode));
        }catch(Exception e){
            e.printStackTrace();
        }
        try{//信用交易
            bubbleList.add(getStockMarginBubble(queryDate, stockCode));
        }catch(Exception e){
            e.printStackTrace();
        }
        bubbleList = bubbleList.stream()
                .filter((bubble)->!ObjectUtils.isEmpty(bubble))
                .collect(Collectors.toList());
        if(bubbleList.size()==0){
            return null;
        }
        return Carousel.builder()
                .contents(bubbleList).build();
    }

    @Override
    public Bubble getStockPriceBubble(LocalDate queryDate, String stockCode) {
        List<StockPriceBean> stockPriceList = stockResource
                .getStockPriceList(stockCode, queryDate.format(DateTimeFormatter.ISO_DATE)
                        , queryDate.format(DateTimeFormatter.ISO_DATE));
        StockPriceBean price = stockPriceList.stream().findFirst().orElse(null);
        if(ObjectUtils.isEmpty(price)){
            return null;
        }
        String fontColor = flexUtil.getFontColor();// 依照漲跌變化字顏色
        if(ObjectUtils.isEmpty(price.getChange())){
        }else if(price.getChange()>0){
            fontColor = flexUtil.getPositiveColor();
        }else if(price.getChange()<0){
            fontColor = flexUtil.getNegativeColor();
        }
        return Bubble.builder()
                .size(Bubble.BubbleSize.MICRO)
                .direction(FlexDirection.LTR)
                .header(Box.builder()
                        .layout(FlexLayout.VERTICAL)
                        .backgroundColor(flexUtil.getBackgroundColor())
                        .contents(flexUtil.getHeaderText().toBuilder()
                                        .text(queryDate.format(DateTimeFormatter.ISO_DATE))
                                        .build(),
                                flexUtil.getHeaderText().toBuilder()
                                        .text(stockCode)
                                        .build(),
                                flexUtil.getHeaderText().toBuilder()
                                        .text("價格")
                                        .build())
                        .build())
                .body(Box.builder()
                        .layout(FlexLayout.VERTICAL)
                        .backgroundColor(flexUtil.getBackgroundColor())
                        .contents(flexUtil.getContentText().toBuilder()
                                        .text(String.format("收盤： %s", ObjectUtils.isEmpty(price.getClose())?"無相關資料":
                                                String.valueOf(price.getClose())))
                                        .build(),
                                flexUtil.getContentText().toBuilder()
                                        .text(String.format("開盤： %s", ObjectUtils.isEmpty(price.getOpen())?"無相關資料":
                                                String.valueOf(price.getOpen())))
                                        .build(),
                                flexUtil.getContentText().toBuilder()
                                        .text(String.format("最低： %s", ObjectUtils.isEmpty(price.getLow())?"無相關資料":
                                                String.valueOf(price.getLow())))
                                        .build(),
                                flexUtil.getContentText().toBuilder()
                                        .text(String.format("最高： %s", ObjectUtils.isEmpty(price.getHigh())?"無相關資料":
                                                String.valueOf(price.getHigh())))
                                        .build(),
                                flexUtil.getContentText().toBuilder()
                                        .text(String.format("漲跌： %s", ObjectUtils.isEmpty(price.getChange())?"無相關資料":
                                                String.valueOf(price.getChange())))
                                        .color(fontColor)
                                        .build(),
                                flexUtil.getContentText().toBuilder()
                                        .text(String.format("幅度： %s", ObjectUtils.isEmpty(price.getChangePercent())?"無相關資料":
                                                price.getChangePercent())+"%")
                                        .color(fontColor)
                                        .build(),
                                flexUtil.getContentText().toBuilder()
                                        .text(String.format("成交量： %s", ObjectUtils.isEmpty(price.getVolume())?"無相關資料":
                                                String.valueOf(price.getVolume())))
                                        .build())
                        .build())
                .build();
    }

    @Override
    public Bubble getStockChipBubble(LocalDate queryDate, String stockCode) {
        List<StockChipBean> stockChipList = stockResource
                .getStockChipList(stockCode, queryDate.format(DateTimeFormatter.ISO_DATE)
                        , queryDate.format(DateTimeFormatter.ISO_DATE));
        StockChipBean chip = stockChipList.stream().findFirst().orElse(null);
        if(ObjectUtils.isEmpty(chip)){
            return null;
        }
        List<Text> textList = chip.getInvestorChip()// 三大法人買賣超
                .stream()
                .map((investorChip)->{
                    String investorName = "";
                    String fontColor = flexUtil.getFontColor();// 依照多空變化字顏色
                    Integer netShare = investorChip.getLongShare() - investorChip.getShortShare();
                    if(ObjectUtils.isEmpty(netShare)){
                    }else if(netShare>0){
                        fontColor = flexUtil.getPositiveColor();
                    }else if(netShare<0){
                        fontColor = flexUtil.getNegativeColor();;
                    }
                    switch(investorChip.getInvestorCode()){
                        case("RI"):
                            investorName = "散戶";
                            break;
                        case("FI"):
                            investorName = "外資";
                            break;
                        case("IT"):
                            investorName = "投信";
                            break;
                        case("D"):
                            investorName = "自營商";
                            break;
                    }
                    return flexUtil.getContentText().toBuilder()
                            .text(String.format("%s： %s", investorName
                                    , netShare))
                            .color(fontColor)
                            .build();
                }).collect(Collectors.toList());

        //淨買賣
        String fontColor = flexUtil.getFontColor();// 依照多空變化字顏色
        if(ObjectUtils.isEmpty(chip.getNetShare())){
        }else if(chip.getNetShare()>0){
            fontColor = flexUtil.getPositiveColor();
        }else if(chip.getNetShare()<0){
            fontColor = flexUtil.getNegativeColor();
        }
        textList.add(flexUtil.getContentText().toBuilder()
                .text("淨買(賣)超：")
                .color(fontColor)
                .build());
        textList.add(flexUtil.getContentText().toBuilder()
                .text(String.valueOf(chip.getNetShare()))
                .color(fontColor)
                .build());

        return Bubble.builder()
                .size(Bubble.BubbleSize.MICRO)
                .direction(FlexDirection.LTR)
                .header(Box.builder()
                        .layout(FlexLayout.VERTICAL)
                        .backgroundColor(flexUtil.getBackgroundColor())
                        .contents(flexUtil.getHeaderText().toBuilder()
                                        .text(queryDate.format(DateTimeFormatter.ISO_DATE))
                                        .build(),
                                flexUtil.getHeaderText().toBuilder()
                                        .text(stockCode)
                                        .build(),
                                flexUtil.getHeaderText().toBuilder()
                                        .text("法人進出")
                                        .build())
                        .build())
                .body(Box.builder()
                        .layout(FlexLayout.VERTICAL)
                        .backgroundColor(flexUtil.getBackgroundColor())
                        .contents(textList.stream().toArray(Text[]::new))
                        .build())
                .build();
    }

    @Override
    public Bubble getStockMarginBubble(LocalDate queryDate, String stockCode) {
        List<StockMarginBean> stockMarginList = stockResource
                .getStockMarginList(stockCode, queryDate.format(DateTimeFormatter.ISO_DATE)
                        , queryDate.format(DateTimeFormatter.ISO_DATE));
        StockMarginBean margin = stockMarginList.stream().findFirst().orElse(null);
        if(ObjectUtils.isEmpty(margin)){
            return null;
        }
        //淨買賣
        String longShareFontColor = flexUtil.getFontColor();// 依照融資增減變化字體顏色
        if(ObjectUtils.isEmpty(margin.getLongShare())){
        }else if(margin.getLongShare()>0){
            longShareFontColor = flexUtil.getPositiveColor();
        }else if(margin.getLongShare()<0){
            longShareFontColor = flexUtil.getNegativeColor();
        }
        String shortShareFontColor = flexUtil.getFontColor();// 依照融券增減變化字體顏色
        if(ObjectUtils.isEmpty(margin.getShortShare())){
        }else if(margin.getShortShare()>0){
            shortShareFontColor = flexUtil.getPositiveColor();
        }else if(margin.getShortShare()<0){
            shortShareFontColor = flexUtil.getNegativeColor();
        }

        return Bubble.builder()
                .size(Bubble.BubbleSize.MICRO)
                .direction(FlexDirection.LTR)
                .header(Box.builder()
                        .layout(FlexLayout.VERTICAL)
                        .backgroundColor(flexUtil.getBackgroundColor())
                        .contents(flexUtil.getHeaderText().toBuilder()
                                        .text(queryDate.format(DateTimeFormatter.ISO_DATE))
                                        .build(),
                                flexUtil.getHeaderText().toBuilder()
                                        .text(stockCode)
                                        .build(),
                                flexUtil.getHeaderText().toBuilder()
                                        .text("信用交易")
                                        .build())
                        .build())
                .body(Box.builder()
                        .layout(FlexLayout.VERTICAL)
                        .backgroundColor(flexUtil.getBackgroundColor())
                        .contents(flexUtil.getContentText().toBuilder()
                                        .text(String.format("融資： %s", ObjectUtils.isEmpty(margin.getLongShare())?"無相關資料":
                                                String.valueOf(margin.getLongShare())))
                                        .color(longShareFontColor)
                                        .build(),
                                flexUtil.getContentText().toBuilder()
                                        .text(String.format("融券： %s", ObjectUtils.isEmpty(margin.getShortShare())?"無相關資料":
                                                String.valueOf(margin.getShortShare())))
                                        .color(shortShareFontColor)
                                        .build(),
                                flexUtil.getContentText().toBuilder()
                                        .text(String.format("融資餘額： %s", ObjectUtils.isEmpty(margin.getTotalLongShare())?"無相關資料":
                                                String.valueOf(margin.getTotalLongShare())))
                                        .build(),
                                flexUtil.getContentText().toBuilder()
                                        .text(String.format("融券餘額： %s", ObjectUtils.isEmpty(margin.getTotalShortShare())?"無相關資料":
                                                String.valueOf(margin.getTotalShortShare())))
                                        .build(),
                                flexUtil.getContentText().toBuilder()
                                        .text(String.format("資券互抵： %s", ObjectUtils.isEmpty(margin.getDayShare())?"無相關資料":
                                                String.valueOf(margin.getDayShare())))
                                        .build())
                        .build())
                .build();
    }
}
