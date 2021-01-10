package com.hsun.chat.bean;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class InvestorFuturesChipBean {
    private String investorCode;
    private Integer openInterestLongLot;
    private Integer openInterestShortLot;
    private Integer openInterestNetLot;
    private Float percent;
}
