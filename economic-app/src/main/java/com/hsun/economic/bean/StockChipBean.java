package com.hsun.economic.bean;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@NoArgsConstructor
@Data
public class StockChipBean {
    private String stockCode;
    private Date date;
    private Integer netShare;
    private List<InvestorStockChipBean> investorChip;
}
