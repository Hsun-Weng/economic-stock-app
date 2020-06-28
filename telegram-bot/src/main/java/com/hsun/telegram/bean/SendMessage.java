package com.hsun.telegram.bean;

import lombok.Data;

@Data
public class SendMessage {
    private final static long serialVersionUID = 0L;

    private Long chatId;
    private String text;
    private String parseMode;
    private Boolean disableWebPagePreview;
    private Boolean disableNotification;
    private Integer replyToMessageId;
    private Object replyMarkup;
}
