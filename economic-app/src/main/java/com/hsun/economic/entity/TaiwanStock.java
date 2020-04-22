package com.hsun.economic.entity;

import java.io.Serializable;
import javax.persistence.*;

import lombok.Data;


/**
 * The persistent class for the taiwan_stock database table.
 * 
 */
@Entity
@Table(name="taiwan_stock")
@Data
@NamedQuery(name="TaiwanStock.findAll", query="SELECT t FROM TaiwanStock t")
public class TaiwanStock implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name="stock_id")
    private int stockId;
	
	@Column(name="stock_code")
	private String stockCode;

	@Column(name="stock_name")
	private String stockName;
}