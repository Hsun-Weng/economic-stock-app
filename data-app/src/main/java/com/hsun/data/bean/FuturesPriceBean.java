package com.hsun.data.bean;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Builder
@Data
public class FuturesPriceBean {
    private Date date;
    private String futuresCode;
    private String contractDate;
    private Double open;
    private Double low;
    private Double high;
    private Double close;
    private Integer volume;
}
