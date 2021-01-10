package com.hsun.economic.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Data
public class OauthTokenPK implements Serializable {/**
     *
     */
    private static final long serialVersionUID = 1L;

    @Column(name="user_name")
    private String userName;
    
    @Column(name="provider_code")
    private Integer providerCode;

}
