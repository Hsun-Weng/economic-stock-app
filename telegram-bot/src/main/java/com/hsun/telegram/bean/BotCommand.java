package com.hsun.telegram.bean;

import lombok.Data;

import java.io.Serializable;

@Data
public class BotCommand implements Serializable {
    private final static long serialVersionUID = 0L;

    private String command;
    private String description;
}
