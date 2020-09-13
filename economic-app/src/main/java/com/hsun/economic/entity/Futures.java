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
@Table(name="futures")
@NamedQuery(name="Futures.findAll", query="SELECT e FROM Futures e")
public class Futures implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="futures_code")
    private String futuresCode;

	@Column(name="futures_name")
	private String futuresName;

	@ManyToOne
    @JoinColumn(name="index_code")
	private StockIndex stockIndex;

	@OneToMany(cascade=CascadeType.ALL, orphanRemoval = true, mappedBy = "id.futuresCode")
	private List<FuturesContract> futuresContractList;
}