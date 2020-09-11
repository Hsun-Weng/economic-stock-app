package com.hsun.economic.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;

import lombok.Data;


/**
 * The persistent class for the economic_data database table.
 * 
 */
@Entity
@Data
@Table(name="stock_index")
@NamedQuery(name="StockIndex.findAll", query="SELECT e FROM StockIndex e")
public class StockIndex implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="index_code")
    private String indexCode;
	
	@Column(name="index_name")
	private String indexName;
	
}