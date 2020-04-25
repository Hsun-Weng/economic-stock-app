package com.hsun.economic.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.Data;

@Embeddable
@Data
public class CategoryStockPK implements Serializable {/**
     * 
     */
    private static final long serialVersionUID = -7003609857421117044L;
    
    @Column(name="category_id")
    private Integer categoryId;
    
    @Column(name="stock_id")
    private Integer stockId;

}
