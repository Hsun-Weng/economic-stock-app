package com.hsun.data.entity;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;

@Document
@Data
public class InvestorChip {
    @Field("investor_code")
    private String investorCode;
    @Field("long_lot")
    private Integer longLot;
    @Field("long_amount")
    private Long longAmount;
    @Field("short_lot")
    private Integer shortLot;
    @Field("short_amount")
    private Long shortAmount;
    @Field("open_interest_long_lot")
    private Integer openInterestLongLot;
    @Field("open_interest_long_amount")
    private Long openInterestLongAmount;
    @Field("open_interest_short_lot")
    private Integer openInterestShortLot;
    @Field("open_interest_short_amount")
    private Long openInterestShortAmount;
}
