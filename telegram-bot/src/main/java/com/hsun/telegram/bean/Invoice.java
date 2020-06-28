package com.hsun.telegram.bean;

import lombok.Data;

import java.io.Serializable;

@Data
public class Invoice implements Serializable {
    private final static long serialVersionUID = 0L;

    private String title, description, startParameter, currency;
    private Integer totalAmount;
}
