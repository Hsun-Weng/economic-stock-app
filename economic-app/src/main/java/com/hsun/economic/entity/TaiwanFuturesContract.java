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
@Table(name="taiwan_futures_contract")
@NamedQuery(name="TaiwanFuturesContract.findAll", query="SELECT e FROM TaiwanFuturesContract e")
public class TaiwanFuturesContract implements Serializable {
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private TaiwanFuturesContractPK id;
	
	@ManyToOne
    @MapsId("futuresId")
    @JoinColumn(name="futures_id", referencedColumnName="futures_id")
	private TaiwanFutures taiwanFutures;
	
}