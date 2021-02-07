package com.hsun.data.bean;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@Data
public class FuturesChipBean {
    private Date date;
    private String futuresCode;
    private List<InvestorFuturesChipBean> investorChip;
}
