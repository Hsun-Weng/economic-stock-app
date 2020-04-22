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
@Table(name="taiwan_stock_index")
@NamedQuery(name="TaiwanStockIndex.findAll", query="SELECT e FROM TaiwanStockIndex e")
public class TaiwanStockIndex implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="index_id")
	private int indexId;

	@Column(name="index_code")
    private String indexCode;
	
	@Column(name="index_name")
	private String indexName;
	
	@OneToMany(cascade=CascadeType.DETACH)
	@MapsId("indexId")
    @JoinColumn(name="index_id", referencedColumnName="index_id")
	private List<TaiwanFutures> taiwanFutures;
}