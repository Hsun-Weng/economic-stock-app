package com.hsun.data.bean;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@Data
public class StockChipBean {
    private String stockCode;
    private Date date;
    private Integer netShare;
    private List<InvestorStockChipBean> investorChip;
}
