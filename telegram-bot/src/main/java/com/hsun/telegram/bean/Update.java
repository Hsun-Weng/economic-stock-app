package com.hsun.telegram.bean;

import lombok.Data;

import java.io.Serializable;

@Data
public class Update implements Serializable {
    private final static long serialVersionUID = 0L;

    private Integer updateId;
    private Message message;
    private Message editedMessage;
    private Message channelPost;
    private Message editedChannelPost;
    private InlineQuery inlineQuery;
    private ChosenInlineResult chosenInlineResult;
    private CallbackQuery callbackQuery;
    private ShippingQuery shippingQuery;
    private PreCheckoutQuery preCheckoutQuery;
    private Poll poll;
    private PollAnswer pollAnswer;
}
