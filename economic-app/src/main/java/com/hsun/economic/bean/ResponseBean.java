package com.hsun.economic.bean;

import lombok.Data;

@Data
public class ResponseBean<T> {
    private T data;
}
