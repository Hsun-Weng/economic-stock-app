package com.hsun.data.entity;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document
@Data
public class InvestorStockChip {
    @Field("investor_code")
    private String investorCode;
    @Field("long_share")
    private Integer longShare;
    @Field("short_share")
    private Integer shortShare;
}
