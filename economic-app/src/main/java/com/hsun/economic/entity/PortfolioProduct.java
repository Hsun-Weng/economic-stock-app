package com.hsun.economic.entity;

import lombok.Data;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@Table(name="portfolio_product")
@NamedQuery(name="PortfolioProduct.findAll", query="SELECT e FROM PortfolioProduct e")
public class PortfolioProduct implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name="portfolio_product_id")
    private Integer portfolioProductId;

    @Column(name="portfolio_id")
    private Integer portfolioId;

    @Column(name="product_id")
    private Integer productId;

    @Column(name="sort")
    private Integer sort;

    @Column(name="product_type")
    private Integer productType;

    @Transient
    private String productCode;

    @Transient
    private String productName;
}
