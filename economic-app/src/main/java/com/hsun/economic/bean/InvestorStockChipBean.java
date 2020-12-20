package com.hsun.economic.bean;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class InvestorStockChipBean {
    private String investorCode;
    private Integer longShare;
    private Integer shortShare;
}
