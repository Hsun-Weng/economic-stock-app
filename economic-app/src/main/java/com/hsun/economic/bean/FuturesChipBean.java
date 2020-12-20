package com.hsun.economic.bean;

import com.google.gson.annotations.Expose;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@Data
public class FuturesChipBean {
    private Date date;
    private String futuresCode;
    private Integer openInterestLot;
    private List<InvestorFuturesChipBean> investorChip;
    @Expose(deserialize = false)
    private Double close;
}
