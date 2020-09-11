package com.hsun.telegram.bean;

import lombok.Data;

import java.io.Serializable;

@Data
public class MessageEntity implements Serializable {
    private final static long serialVersionUID = 0L;

    private String type;
    private Integer offset;
    private Integer length;
    private String url;
    private User user;
    private String language;
}
