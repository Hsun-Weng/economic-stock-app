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

    @EmbeddedId
    private PortfolioProductPK id;

    @Column(name="sort")
    private Integer sort;
}
