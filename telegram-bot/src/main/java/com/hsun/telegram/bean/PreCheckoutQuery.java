package com.hsun.telegram.bean;

import lombok.Data;

import java.io.Serializable;

@Data
public class PreCheckoutQuery implements Serializable {
    private final static long serialVersionUID = 0L;

    private String id;
    private User from;
    private String currency;
    private Integer totalAmount;
    private String invoicePayload;
    private String shippingOptionId;
    private OrderInfo orderInfo;
}
