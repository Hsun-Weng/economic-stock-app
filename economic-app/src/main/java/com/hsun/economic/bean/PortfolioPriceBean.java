package com.hsun.economic.bean;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@AllArgsConstructor
@Builder
public class PortfolioPriceBean {
    private Integer portfolioId;
    private String portfolioName;
    private Date date;
    private Double open;
    private Double low;
    private Double high;
    private Double close;
    private Long volume;
    private Float change;
}
