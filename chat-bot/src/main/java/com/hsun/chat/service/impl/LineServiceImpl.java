package com.hsun.chat.service.impl;

import com.hsun.chat.bean.*;
import com.hsun.chat.resource.FuturesResource;
import com.hsun.chat.resource.StockResource;
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

    @Autowired
    private StockResource stockResource;

    private SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");

    @Override
    public String handleTextMessage(String message) {
        String responseMessage = null;
        List<String> messageList = Arrays.asList(message.trim()
                .split(" ", 3));
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
                    default:
                        // 股票查詢: (ex: 2020-12-31 2330 價格/法人進出/信用交易)
                        if(messageList.size()>=3){
                            responseMessage = getStockMessage(queryDate, messageList.get(1), messageList.get(2));
                        }
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
        InvestorFuturesChipBean retailChip = chip.getInvestorChip()
                .stream().filter((investorChip)->investorChip.getInvestorCode().equals("RI"))
                .findAny().get();

        // 外資
        InvestorFuturesChipBean  foreignLChip = chip.getInvestorChip()
                .stream().filter((investorChip)->investorChip.getInvestorCode().equals("FI"))
                .findAny().get();
        // 投信
        InvestorFuturesChipBean investmentChip = chip.getInvestorChip()
                .stream().filter((investorChip)->investorChip.getInvestorCode().equals("IT"))
                .findAny().get();

        // 自營
        InvestorFuturesChipBean dealerChip = chip.getInvestorChip()
                .stream().filter((investorChip)->investorChip.getInvestorCode().equals("D"))
                .findAny().get();

        StringBuilder stringBuilder = new StringBuilder(String.format("%s\n", simpleDateFormat.format(chip.getDate())));
        stringBuilder.append(String.format("散戶 未平倉口數:%d 佔比:%s%% \n", retailChip.getOpenInterestNetLot()
                , retailChip.getPercent()));
        stringBuilder.append(String.format("外資 未平倉口數:%d 佔比:%s%% \n", foreignLChip.getOpenInterestNetLot()
                , foreignLChip.getPercent()));
        stringBuilder.append(String.format("投信 未平倉口數:%d 佔比:%s%% \n", investmentChip.getOpenInterestNetLot()
                , investmentChip.getPercent()));
        stringBuilder.append(String.format("自營商 未平倉口數:%d 佔比:%s%%", dealerChip.getOpenInterestNetLot()
                , dealerChip.getPercent()));
        return stringBuilder.toString();
    }

    private String getStockMessage(LocalDate queryDate, String stockCode, String commandStr){
        String responseMessage = null;
        switch(commandStr){
            case ("價格"):
                responseMessage= getStockPriceMessage(queryDate, stockCode);
                break;
            case ("法人進出"):
                responseMessage = getStockChipMessage(queryDate, stockCode);
                break;
            case ("信用交易"):
                responseMessage = getStockMarginMessage(queryDate, stockCode);
                break;
        }
        return responseMessage;
    }

    private String getStockPriceMessage(LocalDate queryDate, String stockCode) {
        List<StockPriceBean> stockPriceList = stockResource
                .getStockPriceList(stockCode, queryDate.format(DateTimeFormatter.ISO_DATE)
                        , queryDate.format(DateTimeFormatter.ISO_DATE));
        StockPriceBean price = stockPriceList.get(0);

        StringBuilder stringBuilder = new StringBuilder(String.format("%s\n", simpleDateFormat.format(price.getDate())));
        stringBuilder.append(String.format("股號 %s\n", stockCode));
        stringBuilder.append(String.format("收盤價 %s\n", price.getClose()));
        stringBuilder.append(String.format("開盤價 %s\n", price.getOpen()));
        stringBuilder.append(String.format("最低價 %s\n", price.getLow()));
        stringBuilder.append(String.format("最高價 %s\n", price.getHigh()));
        stringBuilder.append(String.format("漲跌 %s\n", price.getChange()));
        stringBuilder.append(String.format("漲跌幅度 %s%%\n", price.getChangePercent()));
        stringBuilder.append(String.format("成交量 %s", price.getVolume()));
        return stringBuilder.toString();
    }

    private String getStockChipMessage(LocalDate queryDate, String stockCode) {
        List<StockChipBean> stockChipList = stockResource
                .getStockChipList(stockCode, queryDate.format(DateTimeFormatter.ISO_DATE)
                        , queryDate.format(DateTimeFormatter.ISO_DATE));
        StockChipBean chip = stockChipList.get(0);

        // 外資
        InvestorStockChipBean foreignChip = chip.getInvestorChip()
                .stream().filter((investorChip)->investorChip.getInvestorCode().equals("FI"))
                .findAny().get();
        // 投信
        InvestorStockChipBean investmentChip = chip.getInvestorChip()
                .stream().filter((investorChip)->investorChip.getInvestorCode().equals("IT"))
                .findAny().get();

        // 自營
        InvestorStockChipBean dealerChip = chip.getInvestorChip()
                .stream().filter((investorChip)->investorChip.getInvestorCode().equals("D"))
                .findAny().get();

        StringBuilder stringBuilder = new StringBuilder(String.format("%s\n", simpleDateFormat.format(chip.getDate())));
        stringBuilder.append(String.format("股號 %s\n", stockCode));
        stringBuilder.append(String.format("外資 %s\n", foreignChip.getLongShare() - foreignChip.getShortShare()));
        stringBuilder.append(String.format("投信 %s\n", investmentChip.getLongShare() - investmentChip.getShortShare()));
        stringBuilder.append(String.format("自營商 %s\n", dealerChip.getLongShare() - dealerChip.getShortShare()));
        stringBuilder.append(String.format("淨買(賣)超 %s", chip.getNetShare()));
        return stringBuilder.toString();
    }

    private String getStockMarginMessage(LocalDate queryDate, String stockCode) {
        List<StockMarginBean> stockMarginList = stockResource
                .getStockMarginList(stockCode, queryDate.format(DateTimeFormatter.ISO_DATE)
                        , queryDate.format(DateTimeFormatter.ISO_DATE));
        StockMarginBean margin = stockMarginList.get(0);

        StringBuilder stringBuilder = new StringBuilder(String.format("%s\n", simpleDateFormat.format(margin.getDate())));
        stringBuilder.append(String.format("股號 %s\n", stockCode));
        stringBuilder.append(String.format("融資 %s\n", margin.getLongShare()));
        stringBuilder.append(String.format("融券 %s\n", margin.getShortShare()));
        stringBuilder.append(String.format("融資餘額 %s\n", margin.getTotalLongShare()));
        stringBuilder.append(String.format("融券餘額 %s\n", margin.getTotalShortShare()));
        stringBuilder.append(String.format("資券互抵 %s", margin.getDayShare()));
        return stringBuilder.toString();
    }

}
