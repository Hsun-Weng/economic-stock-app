package com.hsun.economic.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;

import lombok.Data;


/**
 * The persistent class for the taiwan_stock database table.
 * 
 */
@Entity
@Table(name="taiwan_stock_category")
@Data
@NamedQuery(name="TaiwanStockCategory.findAll", query="SELECT t FROM TaiwanStockCategory t")
public class TaiwanStockCategory implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name="category_id")
    private int categoryId;
	
	@Column(name="category_code")
	private String categoryCode;

	@Column(name="category_name")
	private String categoryName;
	
	@OneToMany(cascade=CascadeType.DETACH)
    @JoinColumn(name="category_id", referencedColumnName="category_id")
    private List<CategoryStock> categoryStock;
}