package com.hsun.chat.bean;

import com.google.gson.annotations.Expose;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class FuturesChipBean {
    private Date date;
    private String futuresCode;
    private Integer openInterestLot;
    private List<InvestorFuturesChipBean> investorChip;
    @Expose(deserialize = false)
    private Double close;
}
