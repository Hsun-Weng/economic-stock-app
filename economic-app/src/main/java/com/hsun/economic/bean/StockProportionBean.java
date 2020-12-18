package com.hsun.economic.bean;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class StockProportionBean {
    private String stockCode;
    private String stockName;
    private Double proportion;
    private Float changePercent;
}
