package com.hsun.telegram.bean;

import lombok.Data;

import java.io.Serializable;

@Data
public class OrderInfo implements Serializable {
    private final static long serialVersionUID = 0L;

    private String name, phoneNumber, email;
    private ShippingAddress shippingAddress;
}
