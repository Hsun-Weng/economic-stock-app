package com.hsun.chat.bean;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Builder
@Data
public class StockPriceBean {
    private Date date;
    private String stockCode;
    private Double open;
    private Double low;
    private Double high;
    private Double close;
    private Integer volume;
    private Float change;
    private Float changePercent;
}
