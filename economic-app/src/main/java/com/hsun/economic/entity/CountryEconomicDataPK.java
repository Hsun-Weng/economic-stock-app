package com.hsun.economic.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.Data;

@Embeddable
@Data
public class CountryEconomicDataPK implements Serializable {/**
     * 
     */
    private static final long serialVersionUID = -7003609857421117044L;
    
    @Column(name="country_id")
    private Integer countryId;
    
    @Column(name="data_id")
    private Integer dataId;

}
