package com.hsun.economic.bean;

import lombok.Data;

@Data
public class ResponseBean {
    private Integer status;
    private Object data;
    private String message;
}
