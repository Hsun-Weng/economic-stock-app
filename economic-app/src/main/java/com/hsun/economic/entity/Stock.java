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
@Table(name="stock")
@Data
@NamedQuery(name="Stock.findAll", query="SELECT t FROM Stock t")
public class Stock implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="stock_code")
	private String stockCode;

	@Column(name="stock_name")
	private String stockName;
	
	@ManyToMany(mappedBy = "stockList")
	private List<StockCategory> categoryList;
}