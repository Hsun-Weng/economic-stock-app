package com.hsun.economic.entity;

import java.io.Serializable;

import javax.persistence.*;

import lombok.Data;


/**
 * The persistent class for the economic_data database table.
 * 
 */
@Entity
@Data
@Table(name="category_stock")
@NamedQuery(name="CategoryStock.findAll", query="SELECT e FROM CategoryStock e")
public class CategoryStock implements Serializable {
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private CategoryStockPK id;
	
	@ManyToOne
    @MapsId("stockId")
    @JoinColumn(name="stock_id", referencedColumnName="stock_id")
	private TaiwanStock taiwanStock;
	
}