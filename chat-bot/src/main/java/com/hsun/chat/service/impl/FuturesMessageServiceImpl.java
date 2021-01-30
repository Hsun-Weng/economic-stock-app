package com.hsun.chat.service.impl;

import com.google.gson.Gson;
import com.hsun.chat.bean.FuturesBean;
import com.hsun.chat.bean.FuturesChipBean;
import com.hsun.chat.bean.InvestorFuturesChipBean;
import com.hsun.chat.bean.PostbackFunctionBean;
import com.hsun.chat.constants.PostbackFunction;
import com.hsun.chat.resource.FuturesResource;
import com.hsun.chat.service.FuturesMessageService;
import com.hsun.chat.util.FlexUtil;
import com.linecorp.bot.model.action.DatetimePickerAction;
import com.linecorp.bot.model.message.flex.component.Box;
import com.linecorp.bot.model.message.flex.container.Bubble;
import com.linecorp.bot.model.message.flex.container.Carousel;
import com.linecorp.bot.model.message.flex.unit.FlexDirection;
import com.linecorp.bot.model.message.flex.unit.FlexLayout;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import javax.annotation.PostConstruct;
import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FuturesMessageServiceImpl implements FuturesMessageService {

    @Autowired
    private FuturesResource futuresResource;

    @Autowired
    private FlexUtil flexUtil;

    @Autowired
    private Gson gson;

    private List<FuturesBean> futuresList;

    @PostConstruct
    public void init() {
        futuresList = new ArrayList<>();
        futuresList.add(new FuturesBean("TX", "大台"));
        futuresList.add(new FuturesBean("MTX", "小台"));
        futuresList.add(new FuturesBean("GTF", "櫃買"));
        futuresList.add(new FuturesBean("TE", "電子"));
        futuresList.add(new FuturesBean("TF", "金融"));
        futuresList.add(new FuturesBean("XIF", "非金電"));
    }

    @Override
    public Bubble getFuturesChipMenuBubble(){
        final LocalDate today = ZonedDateTime.now(ZoneId.of("Asia/Taipei")).toLocalDate();
        return Bubble.builder()
                .size(Bubble.BubbleSize.KILO)
                .direction(FlexDirection.LTR)
                .header(Box.builder()
                        .layout(FlexLayout.VERTICAL)
                        .backgroundColor(flexUtil.getBackgroundColor())
                        .contents(flexUtil.getHeaderText().toBuilder()
                                .text("期貨未平倉籌碼")
                                .build()
                        ).build())
                .body(Box.builder()
                        .layout(FlexLayout.VERTICAL)
                        .backgroundColor(flexUtil.getBackgroundColor())
                        .contents(futuresList.stream().map((futures)->
                                flexUtil.getContentButton().toBuilder()
                                        .action(DatetimePickerAction.OfLocalDate
                                                .builder()
                                                .initial(today)
                                                .label(futures.getFuturesName())
                                                .data(gson.toJson(new PostbackFunctionBean(PostbackFunction.FUTURES_CHIP.getValue()
                                                        , futures.getFuturesCode())))
                                                .min(today.minus(Period.ofMonths(1)))//最多回溯一個月前
                                                .max(today)
                                                .build())
                                        .build()).collect(Collectors.toList()))
                        .build())
                .build();
    }

    @Override
    public Carousel getFuturesChipMessage(final LocalDate queryDate, final String futuresCode){
        List<FuturesChipBean> futuresChipList = futuresResource
                .getFuturesChipList(futuresCode, queryDate.format(DateTimeFormatter.ISO_DATE)
                        , queryDate.format(DateTimeFormatter.ISO_DATE));
        FuturesChipBean chip = futuresChipList.get(0);

        return Carousel.builder().contents(chip.getInvestorChip()
                .stream()
                .map((investorChip)->convertFuturesInvestorChipBubble(queryDate, futuresList.stream()
                        .filter(futures->futures.getFuturesCode().equals(futuresCode))
                        .findAny().get()
                        .getFuturesName(), investorChip))
                .collect(Collectors.toList())).build();
    }

    @Override
    public Bubble convertFuturesInvestorChipBubble(final LocalDate queryDate, final String futuresChipName
            , InvestorFuturesChipBean investorChip){
        String dateStr = queryDate.format(DateTimeFormatter.ISO_DATE);
        String investorName = "";
        String fontColor = flexUtil.getFontColor();// 依照多空變化字顏色
        if(ObjectUtils.isEmpty(investorChip.getOpenInterestNetLot())){
        }else if(investorChip.getOpenInterestNetLot()>0){
            fontColor = flexUtil.getPositiveColor();
        }else if(investorChip.getOpenInterestNetLot()<0){
            fontColor = flexUtil.getNegativeColor();
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
                        .backgroundColor(flexUtil.getBackgroundColor())
                        .contents(flexUtil.getHeaderText().toBuilder()
                                        .text(dateStr)
                                        .build(),
                                flexUtil.getHeaderText().toBuilder()
                                        .text(futuresChipName)
                                        .build(),
                                flexUtil.getHeaderText().toBuilder()
                                        .text(investorName)
                                        .build())
                        .build())
                .body(Box.builder()
                        .layout(FlexLayout.VERTICAL)
                        .backgroundColor(flexUtil.getBackgroundColor())
                        .contents(flexUtil.getContentText().toBuilder()
                                        .text("未平倉口數")
                                        .color(fontColor)
                                        .build(),
                                flexUtil.getContentText().toBuilder()
                                        .text(ObjectUtils.isEmpty(investorChip.getOpenInterestNetLot())?"無相關資料":
                                                String.valueOf(investorChip.getOpenInterestNetLot()))
                                        .color(fontColor)
                                        .build(),
                                flexUtil.getContentText().toBuilder()
                                        .text("佔比")
                                        .color(fontColor)
                                        .build(),
                                flexUtil.getContentText().toBuilder()
                                        .text(ObjectUtils.isEmpty(investorChip.getPercent())?"無相關資料":
                                                String.valueOf(investorChip.getPercent()))
                                        .color(fontColor)
                                        .build())
                        .build())
                .build();
    }

}
