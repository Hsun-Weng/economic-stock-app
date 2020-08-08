package com.hsun.data.entity;

import java.util.Date;

import javax.persistence.Id;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;

@Document("futures")
@Data
public class Futures {
    @Id
    private ObjectId id;
    @Field("futures_code")
    private String futuresCode;
    @Field("date")
    private Date date;
    @Field("contract_date")
    private String contractDate;
    @Field("open")
    private Double open;
    @Field("low")
    private Double low;
    @Field("high")
    private Double high;
    @Field("close")
    private Double close;
    @Field("volume")
    private Integer volume;
    @Field("open_interest_lot")
    private Integer openInterestLot;
}
