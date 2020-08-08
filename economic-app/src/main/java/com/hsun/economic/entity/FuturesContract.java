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
@Table(name="futures_contract")
@NamedQuery(name="FuturesContract.findAll", query="SELECT e FROM FuturesContract e")
public class FuturesContract implements Serializable {
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private FuturesContractPK id;
}