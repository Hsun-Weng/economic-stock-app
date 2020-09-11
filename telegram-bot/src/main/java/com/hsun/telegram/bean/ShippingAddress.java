package com.hsun.telegram.bean;

import lombok.Data;

import java.io.Serializable;

@Data
public class ShippingAddress implements Serializable {
    private final static long serialVersionUID = 0L;

    private String countryCode, state, city, streetLine1, streetLine2, postCode;
}
