package com.hsun.chat.service.impl;

import com.hsun.chat.bean.*;
import com.hsun.chat.resource.FuturesResource;
import com.hsun.chat.resource.StockResource;
import com.hsun.chat.service.LineService;
import com.linecorp.bot.model.action.Action;
import com.linecorp.bot.model.action.DatetimePickerAction;
import com.linecorp.bot.model.action.MessageAction;
import com.linecorp.bot.model.message.FlexMessage;
import com.linecorp.bot.model.message.flex.component.Box;
import com.linecorp.bot.model.message.flex.component.Button;
import com.linecorp.bot.model.message.flex.component.FlexComponent;
import com.linecorp.bot.model.message.flex.component.Text;
import com.linecorp.bot.model.message.flex.container.Bubble;
import com.linecorp.bot.model.message.flex.container.Carousel;
import com.linecorp.bot.model.message.flex.unit.FlexAlign;
import com.linecorp.bot.model.message.flex.unit.FlexDirection;
import com.linecorp.bot.model.message.flex.unit.FlexFontSize;
import com.linecorp.bot.model.message.flex.unit.FlexLayout;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import javax.swing.text.TextAction;
import javax.swing.text.html.Option;
import java.lang.reflect.Array;
import java.text.SimpleDateFormat;
import java.time.*;
import java.time.chrono.ChronoLocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoField;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class LineServiceImpl implements LineService {

    @Autowired
    private FuturesResource futuresResource;

    @Autowired
    private StockResource stockResource;

    private SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
    private final String BACKGROUND_HEX_COLOR = "#303030";
    private final String FONT_COLOR = "#FFFFFFFF";
    private final String POSITIVE_COLOR = "#00c800";
    private final String NEGATIVE_COLOR = "#c80000";

    @Override
    public Object handleTextMessage(String message) {
        List<String> messageList = Arrays.asList(message.trim()
                .split(" ", 2));
        try {
            if(message.equals("MENU")){
                return getMenu();
            }
            LocalDate queryDate = LocalDate.parse(messageList.get(0), DateTimeFormatter.ISO_DATE);
            if (messageList.size() > 1) {
                switch (messageList.get(1)) {
                    case ("大台期貨籌碼"):
                        return getFuturesChipMessage(queryDate, "TX", "大台期貨");
                    case ("小台期貨籌碼"):
                        return getFuturesChipMessage(queryDate, "MTX", "小台期貨");
                    case ("金融期貨籌碼"):
                        return getFuturesChipMessage(queryDate, "TF", "金融期貨");
                    case ("電子期貨籌碼"):
                        return getFuturesChipMessage(queryDate, "TE", "電子期貨");
                    case ("非金電期貨籌碼"):
                        return getFuturesChipMessage(queryDate, "XIF", "非金電期貨");
                    default:
                        // 股票查詢: (ex: 2020-12-31 2330 價格/法人進出/信用交易)
                        return getStockMessage(queryDate, messageList.get(1));
                }
            }
        }catch(RuntimeException e){
            e.printStackTrace();
        }
        return null;
    }

    private Carousel getMenu(){
        return Carousel.builder().contents(Arrays.asList(getFuturesChipHelpBubble(), getStockHelpBubble()))
                .build();
    }

    private Bubble getFuturesChipHelpBubble(){
        final LocalDate today = ZonedDateTime.now(ZoneId.of("Asia/Taipei")).toLocalDate();
        final List<String> futuresChipFunctionList = Arrays.asList("大台期貨籌碼", "小台期貨籌碼", "電子期貨籌碼"
                , "金融期貨籌碼", "非金電期貨籌碼");
        return Bubble.builder()
                .size(Bubble.BubbleSize.KILO)
                .direction(FlexDirection.LTR)
                .header(Box.builder()
                        .layout(FlexLayout.VERTICAL)
                        .backgroundColor(BACKGROUND_HEX_COLOR)
                        .contents(getHeaderText().toBuilder()
                                .text("期貨未平倉籌碼")
                                .build()
                        ).build())
                .body(Box.builder()
                        .layout(FlexLayout.VERTICAL)
                        .backgroundColor(BACKGROUND_HEX_COLOR)
                        .contents(futuresChipFunctionList.stream().map((functionName)->
                                getContentButton().toBuilder()
                                        .action(DatetimePickerAction.OfLocalDate
                                                .builder()
                                                .initial(today)
                                                .label(functionName)
                                                .data(functionName)
                                                .min(today.minus(Period.ofMonths(1)))//最多回溯一個月前
                                                .max(today)
                                                .build())
                                        .build()).collect(Collectors.toList()))
                        .build())
                .build();
    }

    private Bubble getStockHelpBubble(){
        final LocalDate today = ZonedDateTime.now(ZoneId.of("Asia/Taipei")).toLocalDate();
        return Bubble.builder()
                .size(Bubble.BubbleSize.KILO)
                .direction(FlexDirection.LTR)
                .header(Box.builder()
                        .layout(FlexLayout.VERTICAL)
                        .backgroundColor(BACKGROUND_HEX_COLOR)
                        .contents(getHeaderText().toBuilder()
                                .text("查詢個股資訊")
                                .build()
                        ).build())
                .body(Box.builder()
                        .layout(FlexLayout.VERTICAL)
                        .backgroundColor(BACKGROUND_HEX_COLOR)
                        .contents(getContentButton().toBuilder()
                                    .action(new MessageAction("範例：2330", String.format("%s 2330"
                                            , today.format(DateTimeFormatter.ISO_DATE)))).build())
                        .build())
                .build();
    }

    private Carousel getFuturesChipMessage(LocalDate queryDate, String futuresCode, final String futuresName){
        List<FuturesChipBean> futuresChipList = futuresResource
                .getFuturesChipList(futuresCode, queryDate.format(DateTimeFormatter.ISO_DATE)
                        , queryDate.format(DateTimeFormatter.ISO_DATE));
        FuturesChipBean chip = futuresChipList.get(0);

        return Carousel.builder().contents(chip.getInvestorChip()
                .stream()
                .map((investorChip)->convertFuturesInvestorChipBubble(chip.getDate(), futuresName, investorChip))
                .collect(Collectors.toList())).build();
    }

    private Bubble convertFuturesInvestorChipBubble(final Date queryDate, final String futuresChipName
            , InvestorFuturesChipBean investorChip){
        String dateStr = simpleDateFormat.format(queryDate);
        String investorName = "";
        String fontColor = FONT_COLOR;// 依照多空變化字顏色
        if(ObjectUtils.isEmpty(investorChip.getOpenInterestNetLot())){
            fontColor = FONT_COLOR;
        }else if(investorChip.getOpenInterestNetLot()>0){
            fontColor = POSITIVE_COLOR;
        }else if(investorChip.getOpenInterestNetLot()<0){
            fontColor = NEGATIVE_COLOR;
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
        return Bubble.builder()
                .size(Bubble.BubbleSize.NANO)
                .direction(FlexDirection.LTR)
                .header(Box.builder()
                        .layout(FlexLayout.VERTICAL)
                        .backgroundColor(BACKGROUND_HEX_COLOR)
                        .contents(getHeaderText().toBuilder()
                                        .text(dateStr)
                                        .build(),
                                getHeaderText().toBuilder()
                                        .text(futuresChipName)
                                        .build(),
                                getHeaderText().toBuilder()
                                        .text(investorName)
                                        .build())
                        .build())
                .body(Box.builder()
                        .layout(FlexLayout.VERTICAL)
                        .backgroundColor(BACKGROUND_HEX_COLOR)
                        .contents(getContentText().toBuilder()
                                        .text("未平倉口數")
                                        .color(fontColor)
                                        .build(),
                                getContentText().toBuilder()
                                        .text(ObjectUtils.isEmpty(investorChip.getOpenInterestNetLot())?"無相關資料":
                                                String.valueOf(investorChip.getOpenInterestNetLot()))
                                        .color(fontColor)
                                        .build(),
                                getContentText().toBuilder()
                                        .text("佔比")
                                        .color(fontColor)
                                        .build(),
                                getContentText().toBuilder()
                                        .text(ObjectUtils.isEmpty(investorChip.getPercent())?"無相關資料":
                                                String.valueOf(investorChip.getPercent()))
                                        .color(fontColor)
                                        .build())
                        .build())
                .build();
    }

    private Carousel getStockMessage(LocalDate queryDate, String stockCode){
        List<Bubble> bubbleList = new ArrayList<>(3);
        try{//價格
            bubbleList.add(getStockPriceBubble(queryDate, stockCode));
        }catch(Exception e){
            e.printStackTrace();
        }
        try{//法人進出
            bubbleList.add(getStockChipMessage(queryDate, stockCode));
        }catch(Exception e){
            e.printStackTrace();
        }
        try{//信用交易
            bubbleList.add(getStockMarginMessage(queryDate, stockCode));
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

    private Bubble getStockPriceBubble(LocalDate queryDate, String stockCode) {
        List<StockPriceBean> stockPriceList = stockResource
                .getStockPriceList(stockCode, queryDate.format(DateTimeFormatter.ISO_DATE)
                        , queryDate.format(DateTimeFormatter.ISO_DATE));
        StockPriceBean price = stockPriceList.stream().findFirst().orElse(null);
        if(ObjectUtils.isEmpty(price)){
            return null;
        }
        String fontColor = FONT_COLOR;// 依照漲跌變化字顏色
        if(ObjectUtils.isEmpty(price.getChange())){
            fontColor = FONT_COLOR;
        }else if(price.getChange()>0){
            fontColor = POSITIVE_COLOR;
        }else if(price.getChange()<0){
            fontColor = NEGATIVE_COLOR;
        }
        return Bubble.builder()
                .size(Bubble.BubbleSize.MICRO)
                .direction(FlexDirection.LTR)
                .header(Box.builder()
                        .layout(FlexLayout.VERTICAL)
                        .backgroundColor(BACKGROUND_HEX_COLOR)
                        .contents(getHeaderText().toBuilder()
                                        .text(queryDate.format(DateTimeFormatter.ISO_DATE))
                                        .build(),
                                getHeaderText().toBuilder()
                                        .text(stockCode)
                                        .build(),
                                getHeaderText().toBuilder()
                                        .text("價格")
                                        .build())
                        .build())
                .body(Box.builder()
                        .layout(FlexLayout.VERTICAL)
                        .backgroundColor(BACKGROUND_HEX_COLOR)
                        .contents(getContentText().toBuilder()
                                        .text(String.format("收盤： %s", ObjectUtils.isEmpty(price.getClose())?"無相關資料":
                                                String.valueOf(price.getClose())))
                                        .build(),
                                getContentText().toBuilder()
                                        .text(String.format("開盤： %s", ObjectUtils.isEmpty(price.getOpen())?"無相關資料":
                                                String.valueOf(price.getOpen())))
                                        .build(),
                                getContentText().toBuilder()
                                        .text(String.format("最低： %s", ObjectUtils.isEmpty(price.getLow())?"無相關資料":
                                                String.valueOf(price.getLow())))
                                        .build(),
                                getContentText().toBuilder()
                                        .text(String.format("最高： %s", ObjectUtils.isEmpty(price.getHigh())?"無相關資料":
                                                String.valueOf(price.getHigh())))
                                        .build(),
                                getContentText().toBuilder()
                                        .text(String.format("漲跌： %s", ObjectUtils.isEmpty(price.getChange())?"無相關資料":
                                                String.valueOf(price.getChange())))
                                        .color(fontColor)
                                        .build(),
                                getContentText().toBuilder()
                                        .text(String.format("幅度： %s", ObjectUtils.isEmpty(price.getChangePercent())?"無相關資料":
                                                price.getChangePercent())+"%")
                                        .color(fontColor)
                                        .build(),
                                getContentText().toBuilder()
                                        .text(String.format("成交量： %s", ObjectUtils.isEmpty(price.getVolume())?"無相關資料":
                                                String.valueOf(price.getVolume())))
                                        .build())
                        .build())
                .build();
    }

    private Bubble getStockChipMessage(LocalDate queryDate, String stockCode) {
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
                    String fontColor = FONT_COLOR;// 依照多空變化字顏色
                    Integer netShare = investorChip.getLongShare() - investorChip.getShortShare();
                    if(ObjectUtils.isEmpty(netShare)){
                        fontColor = FONT_COLOR;
                    }else if(netShare>0){
                        fontColor = POSITIVE_COLOR;
                    }else if(netShare<0){
                        fontColor = NEGATIVE_COLOR;
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
                    return getContentText().toBuilder()
                            .text(String.format("%s： %s", investorName
                                    , netShare))
                            .color(fontColor)
                            .build();
                }).collect(Collectors.toList());

        //淨買賣
        String fontColor = FONT_COLOR;// 依照多空變化字顏色
        if(ObjectUtils.isEmpty(chip.getNetShare())){
            fontColor = FONT_COLOR;
        }else if(chip.getNetShare()>0){
            fontColor = POSITIVE_COLOR;
        }else if(chip.getNetShare()<0){
            fontColor = NEGATIVE_COLOR;
        }
        textList.add(getContentText().toBuilder()
                .text("淨買(賣)超：")
                .color(fontColor)
                .build());
        textList.add(getContentText().toBuilder()
                .text(String.valueOf(chip.getNetShare()))
                .color(fontColor)
                .build());

        return Bubble.builder()
                .size(Bubble.BubbleSize.MICRO)
                .direction(FlexDirection.LTR)
                .header(Box.builder()
                        .layout(FlexLayout.VERTICAL)
                        .backgroundColor(BACKGROUND_HEX_COLOR)
                        .contents(getHeaderText().toBuilder()
                                        .text(queryDate.format(DateTimeFormatter.ISO_DATE))
                                        .build(),
                                getHeaderText().toBuilder()
                                        .text(stockCode)
                                        .build(),
                                getHeaderText().toBuilder()
                                        .text("法人進出")
                                        .build())
                        .build())
                .body(Box.builder()
                        .layout(FlexLayout.VERTICAL)
                        .backgroundColor(BACKGROUND_HEX_COLOR)
                        .contents(textList.stream().toArray(Text[]::new))
                        .build())
                .build();
    }

    private Bubble getStockMarginMessage(LocalDate queryDate, String stockCode) {
        List<StockMarginBean> stockMarginList = stockResource
                .getStockMarginList(stockCode, queryDate.format(DateTimeFormatter.ISO_DATE)
                        , queryDate.format(DateTimeFormatter.ISO_DATE));
        StockMarginBean margin = stockMarginList.stream().findFirst().orElse(null);
        if(ObjectUtils.isEmpty(margin)){
            return null;
        }
        //淨買賣
        String longShareFontColor = FONT_COLOR;// 依照融資增減變化字體顏色
        if(ObjectUtils.isEmpty(margin.getLongShare())){
            longShareFontColor = FONT_COLOR;
        }else if(margin.getLongShare()>0){
            longShareFontColor = POSITIVE_COLOR;
        }else if(margin.getLongShare()<0){
            longShareFontColor = NEGATIVE_COLOR;
        }
        String shortShareFontColor = FONT_COLOR;// 依照融券增減變化字體顏色
        if(ObjectUtils.isEmpty(margin.getShortShare())){
            shortShareFontColor = FONT_COLOR;
        }else if(margin.getShortShare()>0){
            shortShareFontColor = POSITIVE_COLOR;
        }else if(margin.getShortShare()<0){
            shortShareFontColor = NEGATIVE_COLOR;
        }

        return Bubble.builder()
                .size(Bubble.BubbleSize.MICRO)
                .direction(FlexDirection.LTR)
                .header(Box.builder()
                        .layout(FlexLayout.VERTICAL)
                        .backgroundColor(BACKGROUND_HEX_COLOR)
                        .contents(getHeaderText().toBuilder()
                                        .text(queryDate.format(DateTimeFormatter.ISO_DATE))
                                        .build(),
                                getHeaderText().toBuilder()
                                        .text(stockCode)
                                        .build(),
                                getHeaderText().toBuilder()
                                        .text("信用交易")
                                        .build())
                        .build())
                .body(Box.builder()
                        .layout(FlexLayout.VERTICAL)
                        .backgroundColor(BACKGROUND_HEX_COLOR)
                        .contents(getContentText().toBuilder()
                                    .text(String.format("融資： %s", ObjectUtils.isEmpty(margin.getLongShare())?"無相關資料":
                                            String.valueOf(margin.getLongShare())))
                                    .color(longShareFontColor)
                                    .build(),
                                getContentText().toBuilder()
                                        .text(String.format("融券： %s", ObjectUtils.isEmpty(margin.getShortShare())?"無相關資料":
                                                String.valueOf(margin.getShortShare())))
                                        .color(shortShareFontColor)
                                        .build(),
                                getContentText().toBuilder()
                                        .text(String.format("融資餘額： %s", ObjectUtils.isEmpty(margin.getTotalLongShare())?"無相關資料":
                                                String.valueOf(margin.getTotalLongShare())))
                                        .build(),
                                getContentText().toBuilder()
                                        .text(String.format("融券餘額： %s", ObjectUtils.isEmpty(margin.getTotalShortShare())?"無相關資料":
                                                String.valueOf(margin.getTotalShortShare())))
                                        .build(),
                                getContentText().toBuilder()
                                        .text(String.format("資券互抵： %s", ObjectUtils.isEmpty(margin.getDayShare())?"無相關資料":
                                                String.valueOf(margin.getDayShare())))
                                        .build())
                        .build())
                .build();
    }

    /**
     * 取得標題文字樣式模板
     * @return
     */
    private Text getHeaderText(){
        return Text.builder()
                .color(FONT_COLOR)
                .weight(Text.TextWeight.BOLD)
                .size(FlexFontSize.Md)
                .align(FlexAlign.CENTER)
                .build();
    }
    /**
     * 取得內容文字樣式模板
     * @return
     */
    private Text getContentText(){
        return Text.builder()
                .color(FONT_COLOR)
                .size(FlexFontSize.SM)
                .align(FlexAlign.CENTER)
                .build();
    }

    /**
     * 取得內容按鈕樣式模板
     * @return
     */
    private Button getContentButton(){
        return Button.builder()
                .style(Button.ButtonStyle.PRIMARY)
                .build();
    }

    /**
     * 取得內容日期選取
     * @return
     */
    private DatetimePickerAction.OfLocalDate getDatePicker(){
        final LocalDate today = ZonedDateTime.now(ZoneId.of("Asia/Taipei")).toLocalDate();
        return DatetimePickerAction.OfLocalDate
                .builder()
                .initial(today)
                .min(today.minus(Period.ofMonths(1)))//最多回溯一個月前
                .max(today)
                .build();

    }

}
