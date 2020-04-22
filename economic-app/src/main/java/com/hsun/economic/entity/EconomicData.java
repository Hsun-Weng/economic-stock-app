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
@Table(name="economic_data")
@NamedQuery(name="EconomicData.findAll", query="SELECT e FROM EconomicData e")
public class EconomicData implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="data_id")
	private int dataId;

	@Column(name="data_name")
	private String dataName;
	
	@Column(name="frequency")
	private int frequency;
	
	@OneToMany(cascade=CascadeType.DETACH)
	@JoinColumn(name="data_id", referencedColumnName="data_id")
	private List<CountryEconomicData> countryEconomicData;
}