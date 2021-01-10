package com.hsun.economic.entity;

import lombok.Data;
import org.hibernate.annotations.Immutable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Immutable
@Data
@Table(name = "stock_proportion_view")
public class StockProportionView implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name="stock_code")
    private String stockCode;

    @Column(name="category_code")
    private String categoryCode;

    @Column(name="stock_name")
    private String stockName;

    @Column(name="proportion")
    private Double proportion;
}
