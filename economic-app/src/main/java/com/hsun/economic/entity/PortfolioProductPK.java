package com.hsun.economic.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Data
public class PortfolioProductPK implements Serializable {/**
 *
 */
private static final long serialVersionUID = -7003609857421117044L;

    @Column(name="portfolio_id")
    private Integer portfolioId;

    @Column(name="product_type")
    private Integer productType;

    @Column(name="product_code")
    private String productCode;
}
