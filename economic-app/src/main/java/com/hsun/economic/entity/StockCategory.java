package com.hsun.economic.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;

import lombok.Data;


/**
 * The persistent class for the stock database table.
 * 
 */
@Entity
@Table(name="stock_category")
@Data
@NamedQuery(name="StockCategory.findAll", query="SELECT t FROM StockCategory t")
public class StockCategory implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="category_code")
	private String categoryCode;

	@Column(name="category_name")
	private String categoryName;
	
	@ManyToMany
	@JoinTable(
		name = "category_stock",
		joinColumns = @JoinColumn(name = "category_code"),
		inverseJoinColumns = @JoinColumn(name = "stock_code")
	)
	private List<Stock> stockList;
}