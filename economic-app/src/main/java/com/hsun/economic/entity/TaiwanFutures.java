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
@Table(name="taiwan_futures")
@NamedQuery(name="TaiwanFutures.findAll", query="SELECT e FROM TaiwanFutures e")
public class TaiwanFutures implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="futures_id")
	private int futuresId;
	
	@Column(name="futures_code")
    private String futuresCode;

	@Column(name="futures_name")
	private String futuresName;
	
	@ManyToOne(cascade=CascadeType.DETACH)
    @JoinColumn(name="index_id", referencedColumnName="index_id")
	private TaiwanStockIndex taiwanStockIndex;
	
	@OneToMany(cascade=CascadeType.DETACH)
    @JoinColumn(name="futures_id", referencedColumnName="futures_id")
	private List<TaiwanFuturesContract> taiwanFuturesContract;
}