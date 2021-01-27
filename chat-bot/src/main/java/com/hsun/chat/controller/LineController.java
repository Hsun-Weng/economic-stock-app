package com.hsun.chat.controller;

import com.hsun.chat.service.LineService;
import com.linecorp.bot.client.LineMessagingClient;
import com.linecorp.bot.model.ReplyMessage;
import com.linecorp.bot.model.event.MessageEvent;
import com.linecorp.bot.model.event.PostbackEvent;
import com.linecorp.bot.model.event.message.TextMessageContent;
import com.linecorp.bot.model.message.FlexMessage;
import com.linecorp.bot.model.message.Message;
import com.linecorp.bot.model.message.TextMessage;
import com.linecorp.bot.model.message.flex.container.Carousel;
import com.linecorp.bot.model.message.flex.container.FlexContainer;
import com.linecorp.bot.model.response.BotApiResponse;
import com.linecorp.bot.spring.boot.annotation.EventMapping;
import com.linecorp.bot.spring.boot.annotation.LineMessageHandler;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.ExecutionException;

@LineMessageHandler
public class LineController {

    @Autowired
    private LineMessagingClient lineMessagingClient;

    @Autowired
    private LineService service;

    @EventMapping
    public void handleTextMessageEvent(MessageEvent<TextMessageContent> event) {
        TextMessageContent message = event.getMessage();
        Object replyObject = service.handleTextMessage(message.getText());
        if(!ObjectUtils.isEmpty(replyObject)){
            if(replyObject instanceof String) {
                replyText(event.getReplyToken(), (String) replyObject);
            }else if(replyObject instanceof FlexContainer){
                replyFlex(event.getReplyToken(), (FlexContainer) replyObject);
            }
        }
    }

    @EventMapping
    public void handlePostbackEvent(PostbackEvent event){
        String message = event.getPostbackContent().getData();
        String dateStr = event.getPostbackContent().getParams().getOrDefault("date", "");
        if(!StringUtils.isEmpty(dateStr)){
            message = String.format("%s %s", dateStr, message);
        }
        Object replyObject = service.handleTextMessage(message);
        if(!ObjectUtils.isEmpty(replyObject)){
            if(replyObject instanceof String) {
                replyText(event.getReplyToken(), (String) replyObject);
            }else if(replyObject instanceof FlexContainer){
                replyFlex(event.getReplyToken(), (FlexContainer) replyObject);
            }
        }
    }

    private void replyText(@NonNull String replyToken, String message){
        lineMessagingClient.replyMessage(new ReplyMessage(replyToken,  Collections.singletonList(new TextMessage(message)), false));
    }
    private void replyFlex(@NonNull String replyToken, @NonNull FlexContainer message){
        lineMessagingClient.replyMessage(new ReplyMessage(replyToken, new FlexMessage("Message", message)
                , false));
    }

}
