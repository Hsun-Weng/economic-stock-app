package com.hsun.chat.bean;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class InvestorStockChipBean {
    private String investorCode;
    private Integer longShare;
    private Integer shortShare;
}
