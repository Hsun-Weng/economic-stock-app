package com.hsun.data.entity;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.persistence.Id;
import java.util.Date;

@Document("stock_margin")
@Data
public class StockMargin {
    @Id
    private ObjectId id;
    @Field("stock_code")
    private String stockCode;
    @Field("date")
    private Date date;
    @Field("long_share")
    private Integer longShare;
    @Field("total_long_share")
    private Integer totalLongShare;
    @Field("short_share")
    private Integer shortShare;
    @Field("total_short_share")
    private Integer totalShortShare;
    @Field("day_share")
    private Integer dayShare;
}
