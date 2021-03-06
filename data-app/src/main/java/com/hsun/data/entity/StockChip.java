package com.hsun.data.entity;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.persistence.Id;
import java.util.Date;
import java.util.List;

@Document("stock_chip")
@Data
public class StockChip {
    @Id
    private ObjectId id;
    @Field("stock_code")
    private String stockCode;
    @Field("date")
    private Date date;
    @Field("net_share")
    private Integer netShare;
    @Field("investor_chip")
    private List<InvestorStockChip> investorStockChip;
}
