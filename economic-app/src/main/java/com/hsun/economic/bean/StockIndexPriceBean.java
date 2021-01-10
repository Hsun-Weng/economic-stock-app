package com.hsun.economic.bean;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@Data
@EqualsAndHashCode(callSuper=false)
public class StockIndexPriceBean extends PriceBean {
    private String indexCode;
}
