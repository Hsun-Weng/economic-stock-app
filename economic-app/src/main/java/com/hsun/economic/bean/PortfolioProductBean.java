package com.hsun.economic.bean;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class PortfolioProductBean {
    private Integer productType;
    private String productCode;
    private String productName;
    private Integer sort;
}
