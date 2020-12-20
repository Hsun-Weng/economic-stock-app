package com.hsun.economic.bean;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ProductBean {
    private Integer productType;
    private String productCode;
    private String productName;
}
