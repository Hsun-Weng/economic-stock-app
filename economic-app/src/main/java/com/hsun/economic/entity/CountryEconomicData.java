package com.hsun.economic.entity;

import java.io.Serializable;
import javax.persistence.*;

import lombok.Data;


/**
 * The persistent class for the country_economic_data database table.
 * 
 */
@Entity
@Table(name="country_economic_data")
@Data
@NamedQuery(name="CountryEconomicData.findAll", query="SELECT c FROM CountryEconomicData c")
public class CountryEconomicData implements Serializable {
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private CountryEconomicDataPK id;
	
	@ManyToOne
	@MapsId("countryId")
	@JoinColumn(name="country_id", referencedColumnName="country_id")
	private Country country;
	
	@ManyToOne
	@MapsId("dataId")
	@JoinColumn(name="data_id", referencedColumnName="data_id")
	private EconomicData economicData;

}