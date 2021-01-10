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
@Table(name = "stock_category_proportion_view")
public class StockCategoryProportionView implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name="category_code")
    private String categoryCode;

    @Column(name="category_name")
    private String categoryName;

    @Column(name="proportion")
    private Double proportion;
}
