package com.hsun.chat.controller;

import com.hsun.chat.service.LineService;
import com.linecorp.bot.client.LineMessagingClient;
import com.linecorp.bot.model.ReplyMessage;
import com.linecorp.bot.model.event.MessageEvent;
import com.linecorp.bot.model.event.message.TextMessageContent;
import com.linecorp.bot.model.message.Message;
import com.linecorp.bot.model.message.TextMessage;
import com.linecorp.bot.model.response.BotApiResponse;
import com.linecorp.bot.spring.boot.annotation.EventMapping;
import com.linecorp.bot.spring.boot.annotation.LineMessageHandler;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

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
        replyText(event.getReplyToken(), service.handleTextMessage(message.getText()));
    }

    private void replyText(@NonNull String replyToken, String message){
        if(!StringUtils.isEmpty(replyToken)&&!StringUtils.isEmpty(message)){
            reply(replyToken, Collections.singletonList(new TextMessage(message)), false);
        }
    }
    private void reply(@NonNull String replyToken, @NonNull List<Message> messageList, Boolean notificationDisabled){
        lineMessagingClient.replyMessage(new ReplyMessage(replyToken, messageList, notificationDisabled));
    }


}
