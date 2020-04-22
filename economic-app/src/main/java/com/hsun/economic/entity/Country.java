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

	@Column(name="country_code", insertable=false, updatable=false)
	private String countryCode;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="country_id", insertable=false, updatable=false)
	private Integer countryId;

	@Column(name="country_name", insertable=false, updatable=false)
	private String countryName;
	
	@OneToMany(cascade=CascadeType.DETACH)
	@JoinColumn(name="country_id", referencedColumnName="country_id")
	private List<CountryEconomicData> countryEconomicData; 
}