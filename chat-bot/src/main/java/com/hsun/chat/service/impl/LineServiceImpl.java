package com.hsun.chat.service.impl;

import com.hsun.chat.bean.FuturesChipBean;
import com.hsun.chat.bean.InvestorFuturesChipBean;
import com.hsun.chat.resource.FuturesResource;
import com.hsun.chat.service.LineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.*;
import java.time.chrono.ChronoLocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoField;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
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
        List<String> messageList = Arrays.asList(message.trim()
                .split(" ", 2));
        try {
            LocalDate queryDate = LocalDate.parse(messageList.get(0), DateTimeFormatter.ISO_DATE);
            if (messageList.size() > 1) {
                switch (messageList.get(1)) {
                    case ("大台期貨籌碼"):
                        responseMessage = getFuturesChipMessage(queryDate, "TX");
                        break;
                    case ("小台期貨籌碼"):
                        responseMessage = getFuturesChipMessage(queryDate, "MTX");
                        break;
                    case ("金融期貨籌碼"):
                        responseMessage = getFuturesChipMessage(queryDate, "TF");
                        break;
                    case ("電子期貨籌碼"):
                        responseMessage = getFuturesChipMessage(queryDate, "TE");
                        break;
                    case ("非金電期貨籌碼"):
                        responseMessage = getFuturesChipMessage(queryDate, "XIF");
                        break;
                }
            }
            return responseMessage;
        }catch(RuntimeException e){
            e.printStackTrace();
        }
        return null;
    }

    private String getFuturesChipMessage(LocalDate queryDate, String futuresCode){
        List<FuturesChipBean> futuresChipList = futuresResource
                .getFuturesChipList(futuresCode, queryDate.format(DateTimeFormatter.ISO_DATE)
                        , queryDate.format(DateTimeFormatter.ISO_DATE));
        FuturesChipBean chip = futuresChipList.get(0);

        // 散戶
        InvestorFuturesChipBean retailLatestInvestor = chip.getInvestorChip()
                .stream().filter((investorChip)->investorChip.getInvestorCode().equals("RI"))
                .findAny().get();
        System.out.println(retailLatestInvestor);

        // 外資
        InvestorFuturesChipBean foreignLatestInvestor = chip.getInvestorChip()
                .stream().filter((investorChip)->investorChip.getInvestorCode().equals("FI"))
                .findAny().get();
        // 投信
        InvestorFuturesChipBean investmentLatestInvestor = chip.getInvestorChip()
                .stream().filter((investorChip)->investorChip.getInvestorCode().equals("IT"))
                .findAny().get();

        // 自營
        InvestorFuturesChipBean dealerLatestInvestor = chip.getInvestorChip()
                .stream().filter((investorChip)->investorChip.getInvestorCode().equals("D"))
                .findAny().get();

        StringBuilder stringBuilder = new StringBuilder(String.format("%s\n", simpleDateFormat.format(chip.getDate())));
        stringBuilder.append(String.format("散戶 未平倉口數:%d 佔比:%s%% \n", retailLatestInvestor.getOpenInterestNetLot()
                , retailLatestInvestor.getPercent()));
        stringBuilder.append(String.format("外資 未平倉口數:%d 佔比:%s%% \n", foreignLatestInvestor.getOpenInterestNetLot()
                , foreignLatestInvestor.getPercent()));
        stringBuilder.append(String.format("投信 未平倉口數:%d 佔比:%s%% \n", investmentLatestInvestor.getOpenInterestNetLot()
                , investmentLatestInvestor.getPercent()));
        stringBuilder.append(String.format("自營商 未平倉口數:%d 佔比:%s%% \n", dealerLatestInvestor.getOpenInterestNetLot()
                , dealerLatestInvestor.getPercent()));
        return stringBuilder.toString();
    }
}
