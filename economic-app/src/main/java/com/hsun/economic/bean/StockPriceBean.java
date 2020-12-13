package com.hsun.economic.bean;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder(toBuilder = true)
@EqualsAndHashCode(callSuper=false)
public class StockPriceBean extends PriceBean {
    private String stockCode;
    private String stockName;
}
