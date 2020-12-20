package com.hsun.economic.bean;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class InvestorFuturesChipBean {
    private String investorCode;
    private Integer openInterestLongLot;
    private Integer openInterestShortLot;
    private Integer openInterestNetLot;
    private Float percent;
}
