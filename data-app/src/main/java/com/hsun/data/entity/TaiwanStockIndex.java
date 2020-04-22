package com.hsun.data.entity;

import java.util.Date;

import javax.persistence.Id;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;

@Document("taiwan_stock_index")
@Data
public class TaiwanStockIndex {
    @Id
    private ObjectId id;
    @Field("index_code")
    private String indexCode;
    @Field("date")
    private Date date;
    @Field("open")
    private Double open;
    @Field("low")
    private Double low;
    @Field("high")
    private Double high;
    @Field("close")
    private Double close;
    @Field("volume")
    private Long volume;
}
