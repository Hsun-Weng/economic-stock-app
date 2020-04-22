package com.hsun.data.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Id;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;

@Document("taiwan_futures_chip")
@Data
public class TaiwanFuturesChip {
    @Id
    private ObjectId id;
    @Field("futures_code")
    private String futuresCode;
    @Field("date")
    private Date date;
    @Field("investor_chip")
    private List<InvestorChip> investorChip;
    @Transient
    private Integer openInterestLot;
}
