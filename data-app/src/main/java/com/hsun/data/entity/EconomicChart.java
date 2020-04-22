package com.hsun.data.entity;

import javax.persistence.Id;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;

@Document("economic_chart")
@Data
public class EconomicChart {
    @Id
    private ObjectId id;
    @Field("data_id")
    private Integer dataId;
    @Field("data_name")
    private String dataName;
    @Field("chart")
    private org.bson.Document chart;
}
