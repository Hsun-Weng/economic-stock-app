package com.hsun.economic.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;

import lombok.Data;


/**
 * The persistent class for the country database table.
 * 
 */
@Entity
@Data
@NamedQuery(name="Country.findAll", query="SELECT c FROM Country c")
public class Country implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="country_code", insertable=false, updatable=false)
	private String countryCode;

	@Column(name="country_name", insertable=false, updatable=false)
	private String countryName;
	
	@ManyToMany
	@JoinTable(
		name="country_economic_data",
		joinColumns = @JoinColumn(name = "country_code"),
		inverseJoinColumns = @JoinColumn(name = "data_code")
	)
	private List<EconomicData> economicDataList;
}