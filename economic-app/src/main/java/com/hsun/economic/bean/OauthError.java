package com.hsun.economic.bean;

import lombok.Data;

@Data
public class OauthError {
    private String error;
    private String type;
    private Integer code;
    private Integer errorSubcode;
    private String fbtraceId;
}
