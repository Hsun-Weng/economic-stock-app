package com.hsun.chat.service.impl;

import com.hsun.chat.bean.FuturesChipBean;
import com.hsun.chat.bean.InvestorFuturesChipBean;
import com.hsun.chat.resource.FuturesResource;
import com.hsun.chat.service.LineService;
import jdk.vm.ci.meta.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.*;
import java.time.chrono.ChronoLocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoField;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;

@Service
public class LineServiceImpl implements LineService {

    @Autowired
    private FuturesResource futuresResource;

    private SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");

    @Override
    public String handleTextMessage(String message) {
        String responseMessage = null;
        switch(message.trim()){
            case ("大台期貨籌碼"):
                responseMessage = getFuturesChipMessage("TX");
                break;
            case ("小台期貨籌碼"):
                responseMessage = getFuturesChipMessage("MTX");
                break;
            case ("金融期貨籌碼"):
                responseMessage = getFuturesChipMessage("TF");
                break;
            case ("電子期貨籌碼"):
                responseMessage = getFuturesChipMessage("TE");
                break;
            case ("非金電期貨籌碼"):
                responseMessage = getFuturesChipMessage("XIF");
                break;
        }
        return responseMessage;
    }

    private String getFuturesChipMessage(String futuresCode){
        List<FuturesChipBean> futuresChipList = futuresResource
                .getFuturesChipList(futuresCode, getSecondaryLatestWorkingDay().format(DateTimeFormatter.ISO_DATE)
                        , getLatestWorkingDay().format(DateTimeFormatter.ISO_DATE)).getData();
        FuturesChipBean secondaryChip = futuresChipList.get(0);
        FuturesChipBean latestChip = futuresChipList.get(1);

        // 散戶
        InvestorFuturesChipBean retailLatestInvestor = latestChip.getInvestorChip()
                .stream().filter((investorChip)->investorChip.getInvestorCode().equals("RI"))
                .findAny().get();
        InvestorFuturesChipBean retailSecondaryInvestor = secondaryChip.getInvestorChip()
                .stream().filter((investorChip)->investorChip.getInvestorCode().equals("RI"))
                .findAny().get();

        // 外資
        InvestorFuturesChipBean foreignLatestInvestor = latestChip.getInvestorChip()
                .stream().filter((investorChip)->investorChip.getInvestorCode().equals("FI"))
                .findAny().get();
        InvestorFuturesChipBean foreignSecondaryInvestor = secondaryChip.getInvestorChip()
                .stream().filter((investorChip)->investorChip.getInvestorCode().equals("FI"))
                .findAny().get();
        // 投信
        InvestorFuturesChipBean investmentLatestInvestor = latestChip.getInvestorChip()
                .stream().filter((investorChip)->investorChip.getInvestorCode().equals("IT"))
                .findAny().get();
        InvestorFuturesChipBean investmentSecondaryInvestor = secondaryChip.getInvestorChip()
                .stream().filter((investorChip)->investorChip.getInvestorCode().equals("IT"))
                .findAny().get();

        // 自營
        InvestorFuturesChipBean dealerLatestInvestor = latestChip.getInvestorChip()
                .stream().filter((investorChip)->investorChip.getInvestorCode().equals("D"))
                .findAny().get();
        InvestorFuturesChipBean dealerSecondaryInvestor = secondaryChip.getInvestorChip()
                .stream().filter((investorChip)->investorChip.getInvestorCode().equals("D"))
                .findAny().get();

        StringBuilder stringBuilder = new StringBuilder(String.format("%s\n", simpleDateFormat.format(latestChip.getDate())));
        stringBuilder.append(String.format("散戶 未平倉口數:%d 佔比:%s%% \n", retailLatestInvestor.getOpenInterestNetLot()
                , retailLatestInvestor.getPercent()));
        stringBuilder.append(String.format("外資 未平倉口數:%d 佔比:%s%% \n", foreignLatestInvestor.getOpenInterestNetLot()
                , foreignLatestInvestor.getPercent()));
        stringBuilder.append(String.format("投信 未平倉口數:%d 佔比:%s%% \n", investmentLatestInvestor.getOpenInterestNetLot()
                , investmentLatestInvestor.getPercent()));
        stringBuilder.append(String.format("自營商 未平倉口數:%d 佔比:%s%% \n", dealerLatestInvestor.getOpenInterestNetLot()
                , dealerLatestInvestor.getPercent()));
        stringBuilder.append(String.format("%s\n", simpleDateFormat.format(secondaryChip.getDate())));
        stringBuilder.append(String.format("散戶 未平倉口數:%d 佔比:%s%% \n", retailSecondaryInvestor.getOpenInterestNetLot()
                , retailSecondaryInvestor.getPercent()));
        stringBuilder.append(String.format("外資 未平倉口數:%d 佔比:%s%% \n", foreignSecondaryInvestor.getOpenInterestNetLot()
                , foreignSecondaryInvestor.getPercent()));
        stringBuilder.append(String.format("投信 未平倉口數:%d 佔比:%s%% \n", investmentSecondaryInvestor.getOpenInterestNetLot()
                , investmentSecondaryInvestor.getPercent()));
        stringBuilder.append(String.format("自營商 未平倉口數:%d 佔比:%s%%", dealerSecondaryInvestor.getOpenInterestNetLot()
                , dealerSecondaryInvestor.getPercent()));
        return stringBuilder.toString();
    }

    private LocalDate getLatestWorkingDay(){
        LocalDate today = null;
        if(LocalDateTime.now().get(ChronoField.HOUR_OF_DAY)<=15){
            today = LocalDate.now().minusDays(1);
        }else{
            today = LocalDate.now();
        }
        DayOfWeek dayOfWeek = DayOfWeek.of(today.get(ChronoField.DAY_OF_WEEK));
        switch (dayOfWeek) {
            case SUNDAY:
                return today.minus(2, ChronoUnit.DAYS);
            case SATURDAY:
                return today.minus(1, ChronoUnit.DAYS);
            default:
                return today;
        }
    }

    private LocalDate getSecondaryLatestWorkingDay(){
        LocalDate yesterday = null;
        if(LocalDateTime.now().get(ChronoField.HOUR_OF_DAY)<=15){
            yesterday = LocalDate.now().minusDays(2);
        }else{
            yesterday = LocalDate.now().minusDays(1);
        }
        DayOfWeek dayOfWeek = DayOfWeek.of(yesterday.get(ChronoField.DAY_OF_WEEK));
        switch (dayOfWeek) {
            case SUNDAY:
                return yesterday.minus(2, ChronoUnit.DAYS);
            case SATURDAY:
                return yesterday.minus(1, ChronoUnit.DAYS);
            default:
                return yesterday;
        }
    }
}
