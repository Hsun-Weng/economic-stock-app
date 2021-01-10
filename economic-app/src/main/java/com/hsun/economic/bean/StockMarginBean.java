package com.hsun.economic.bean;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@Data
public class StockMarginBean {
    private Date date;
    private Integer longShare;
    private Integer totalLongShare;
    private Integer shortShare;
    private Integer totalShortShare;
    private Integer dayShare;
}
