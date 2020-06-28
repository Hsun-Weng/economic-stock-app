package com.hsun.telegram.bean;

import lombok.Data;

import java.io.Serializable;

@Data
public class CallbackQuery implements Serializable {
    private final static long serialVersionUID = 0L;

    private String id;
    private User from;
    private Message message;
    private String inlineMessageId;
    private String chatInstance;
    private String data;
    private String gameShortName;
}
