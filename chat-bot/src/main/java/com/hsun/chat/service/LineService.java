package com.hsun.chat.service;

import com.linecorp.bot.model.event.postback.PostbackContent;

public interface LineService {
    Object handleTextMessage(String message);
    Object handlePostback(PostbackContent postbackContent);
}
