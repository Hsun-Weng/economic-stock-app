package com.hsun.economic.entity;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
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
    @GeneratedValue
    @Column(name="portfolio_id")
    private Integer portfolioId;

    @Column(name="portfolio_name")
    private String portfolioName;

    @Column(name="user_name")
    private String userName;

    @OneToMany(mappedBy = "userPortfolio",cascade = {CascadeType.PERSIST, CascadeType.MERGE}, orphanRemoval = true)
    @ToString.Exclude
    @Setter(AccessLevel.NONE)
    private List<PortfolioProduct> portfolioProductList = new ArrayList<>();

    public void setPortfolioProductList(List<PortfolioProduct> portfolioProductList) {
        this.portfolioProductList.clear();
        if(portfolioProductList!=null) {
            this.portfolioProductList.addAll(portfolioProductList);
        }
    }
}
