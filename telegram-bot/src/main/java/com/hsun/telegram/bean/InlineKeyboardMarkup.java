package com.hsun.telegram.bean;

import lombok.Data;

import java.io.Serializable;

@Data
public class InlineKeyboardMarkup implements Serializable {
    private final static long serialVersionUID = 0L;

    private final InlineKeyboardButton[][] inlineKeyboard;
}
