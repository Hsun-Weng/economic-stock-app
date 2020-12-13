package com.hsun.economic.bean;

import lombok.Data;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@SuperBuilder(toBuilder = true)
@Data
public class PriceBean {
    private Date date;
    private Double open;
    private Double low;
    private Double high;
    private Double close;
    private Long volume;
    private Float change;
    private Float changePercent;
}
