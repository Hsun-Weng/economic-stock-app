package com.hsun.telegram.bean;

import lombok.Data;

import java.io.Serializable;

@Data
public class LoginUrl implements Serializable {
    private final static long serialVersionUID = 0L;

    private String url;
    private String forwardText;
    private String botUsername;
    private Boolean requestWriteAccess;
}
