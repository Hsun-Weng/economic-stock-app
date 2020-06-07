package com.hsun.economic.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

/**
 * The persistent class for the economic_data database table.
 *
 */
@Entity
@Data
@Table(name="user_portfolio")
@NamedQuery(name="UserPortfolio.findAll", query="SELECT e FROM UserPortfolio e")
public class UserPortfolio implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name="portfolio_id")
    private Integer portfolioId;

    @Column(name="portfolio_name")
    private String portfolioName;

    @Column(name="user_id")
    private Integer userId;

    @OneToMany(cascade=CascadeType.REMOVE)
    @JoinColumn(name="portfolio_id")
    private List<PortfolioProduct> portfolioProductList;
}
