package com.hsun.chat.bean;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Builder
@Data
public class StockMarginBean {
    private String stockCode;
    private Date date;
    private Integer longShare;
    private Integer totalLongShare;
    private Integer shortShare;
    private Integer totalShortShare;
    private Integer dayShare;
}
