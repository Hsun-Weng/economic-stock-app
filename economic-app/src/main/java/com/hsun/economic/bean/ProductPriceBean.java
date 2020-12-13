package com.hsun.economic.bean;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper=false)
@Data
@SuperBuilder(toBuilder = true)
public class ProductPriceBean extends PriceBean{
    private Integer productType;
    private String productCode;
    private String productName;
    private Integer sort;
}
