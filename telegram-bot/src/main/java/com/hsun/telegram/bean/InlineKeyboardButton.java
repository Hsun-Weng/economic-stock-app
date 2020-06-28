package com.hsun.telegram.bean;

import lombok.Data;

import java.io.Serializable;

@Data
public class InlineKeyboardButton implements Serializable {
    private final static long serialVersionUID = 0L;

    private String text;
    private String url;
    private LoginUrl loginUrl;
    private String callbackData;
    private String switchInlineQuery;
    private String switchInlineQueryCurrentChat;
    private CallbackGame callbackGame;
    private Boolean pay;
}
