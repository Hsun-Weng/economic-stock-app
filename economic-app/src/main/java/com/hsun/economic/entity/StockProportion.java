package com.hsun.economic.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name="stock_proportion")
@NamedQuery(name="StockProportion.findAll", query="SELECT e FROM StockProportion e")
public class StockProportion {
    @Id
    @Column(name="rank")
    private Integer rank;
    @Column(name="stock_code")
    private String stockCode;
    @Column(name="proportion")
    private Float proportion;
    @Column(name="create_time")
    @CreationTimestamp
    private Date updateTime;
}
