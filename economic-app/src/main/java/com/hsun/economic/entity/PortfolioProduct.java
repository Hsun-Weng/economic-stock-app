package com.hsun.economic.entity;

import lombok.Data;

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
}
