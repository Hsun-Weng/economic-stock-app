package com.hsun.economic.bean;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class StockProportionBean {
    private String stockCode;
    private String stockName;
    private Float proportion;
    private Float changePercent;
}
