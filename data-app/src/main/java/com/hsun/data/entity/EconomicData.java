package com.hsun.data.entity;

import java.util.Date;
import javax.persistence.Id;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;

@Document("economic_data")
@Data
public class EconomicData {
    @Id
    private ObjectId id;
    @Field("country_code")
    private String countryCode;
    @Field("data_id")
    private Integer dataId;
    @Field("date")
    private Date date;
    @Field("data_name")
    private String dataName;
    @Field("value")
    private org.bson.Document value;
}
