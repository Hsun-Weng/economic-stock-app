package com.hsun.economic.bean;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class StockPriceBean extends PriceBean {
    private Integer sort;
    private String stockCode;
    private String stockName;
}
