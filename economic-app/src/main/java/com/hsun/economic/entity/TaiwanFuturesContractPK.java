package com.hsun.economic.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.Data;

@Embeddable
@Data
public class TaiwanFuturesContractPK implements Serializable {/**
     * 
     */
    private static final long serialVersionUID = -7003609857421117044L;
    
    @Column(name="futures_id")
    private Integer futuresId;
    
    @Column(name="contract_date")
    private String contractDate;

}
