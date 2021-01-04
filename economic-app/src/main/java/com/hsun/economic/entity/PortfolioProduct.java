package com.hsun.economic.entity;

import com.google.gson.annotations.Expose;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@Table(name="portfolio_product")
@NamedQuery(name="PortfolioProduct.findAll", query="SELECT e FROM PortfolioProduct e")
public class PortfolioProduct implements Serializable {
    private static final long serialVersionUID = 1L;

    @EmbeddedId
    private PortfolioProductPK id;

    @Column(name="sort")
    private Integer sort;

    @ManyToOne
    @JoinColumn(name = "portfolio_id", referencedColumnName = "portfolio_id")
    @MapsId("portfolioId")
    @Expose(serialize = false)
    private UserPortfolio userPortfolio;
}
