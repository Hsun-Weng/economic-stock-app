package com.hsun.chat.service.impl;

import com.google.gson.Gson;
import com.hsun.chat.bean.PostbackFunctionBean;
import com.hsun.chat.constants.PostbackFunction;
import com.hsun.chat.service.FuturesMessageService;
import com.hsun.chat.service.LineService;
import com.hsun.chat.service.StockMessageService;
import com.linecorp.bot.model.event.postback.PostbackContent;
import com.linecorp.bot.model.message.flex.container.Carousel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class LineServiceImpl implements LineService {

    @Autowired
    private StockMessageService stockMessageService;

    @Autowired
    private FuturesMessageService futuresMessageService;

    @Autowired
    private Gson gson;

    @Override
    public Object handleTextMessage(String message) {
        List<String> messageList = Arrays.asList(message.trim()
                .split(" ", 2));
        try {
            if(message.equals("MENU")){
                return getMenu();
            }
            switch (messageList.get(0)) {
                case ("MENU"):
                    if(messageList.size()==1){
                        return getMenu();
                    }
                    break;
                case ("查詢個股"):
                    if(messageList.size()>1) {
                        // 返回個股資訊
                        return stockMessageService.getStockInfoBubble(messageList.get(1));
                    }
            }
        }catch(RuntimeException e){
        }
        return null;
    }

    @Override
    public Object handlePostback(PostbackContent postbackContent) {
        PostbackFunctionBean postbackFunctionBean = gson.fromJson(postbackContent.getData(), PostbackFunctionBean.class);
        try {
            LocalDate queryDate = null;
            switch(PostbackFunction.fromValue(postbackFunctionBean.getFunctionCode())){
                case FUTURES_CHIP:
                    queryDate = LocalDate.parse(postbackContent.getParams().getOrDefault("date", ""),
                            DateTimeFormatter.ISO_DATE);
                    return futuresMessageService.getFuturesChipMessage(queryDate, postbackFunctionBean.getValue());
                case STOCK:
                    queryDate = LocalDate.parse(postbackContent.getParams().getOrDefault("date", ""),
                            DateTimeFormatter.ISO_DATE);
                    return stockMessageService.getStockCarousel(queryDate, postbackFunctionBean.getValue());
            }
        }catch(RuntimeException e){
        }
        return null;
    }

    private Carousel getMenu(){
        return Carousel.builder().contents(Arrays.asList(futuresMessageService.getFuturesChipMenuBubble()
                    , stockMessageService.getStockMenuBubble())).build();
    }
}
