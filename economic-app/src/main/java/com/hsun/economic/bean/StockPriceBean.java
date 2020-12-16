package com.hsun.economic.bean;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class StockPriceBean extends PriceBean {
    private String stockCode;
    private String stockName;
}
