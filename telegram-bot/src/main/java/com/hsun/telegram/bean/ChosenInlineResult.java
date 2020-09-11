package com.hsun.telegram.bean;

import lombok.Data;

import java.io.Serializable;

@Data
public class ChosenInlineResult implements Serializable {
    private final static long serialVersionUID = 0L;

    private String resultId;
    private User from;
    private Location location;
    private String inlineMessageId;
    private String query;
}
