package com.hsun.economic.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.Data;

@Embeddable
@Data
public class FuturesContractPK implements Serializable {/**
     * 
     */
    private static final long serialVersionUID = -7003609857421117044L;
    
    @Column(name="futures_code")
    private String futuresCode;
    
    @Column(name="contract_date")
    private String contractDate;

}
