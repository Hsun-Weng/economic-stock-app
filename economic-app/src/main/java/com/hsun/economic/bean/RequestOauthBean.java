package com.hsun.economic.bean;

import lombok.Data;

@Data
public class RequestOauthBean {
    private Integer providerCode;
    private String code;
}
