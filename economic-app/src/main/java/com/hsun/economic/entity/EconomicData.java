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
	@Column(name="data_code")
	private String dataCode;

	@Column(name="data_name")
	private String dataName;
	
	@Column(name="frequency")
	private int frequency;
	
	@ManyToMany(mappedBy = "economicDataList")
	private List<Country> countryList;
}