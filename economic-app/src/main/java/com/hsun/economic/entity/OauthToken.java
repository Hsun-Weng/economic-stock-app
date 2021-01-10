package com.hsun.economic.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@Table(name="oauth_token")
@NamedQuery(name="OauthToken.findAll", query="SELECT e FROM OauthToken e")
public class OauthToken implements Serializable {
    private static final long serialVersionUID = 1L;

    @EmbeddedId
    private OauthTokenPK id;

    @Column(name="access_token")
    private String accessToken;
    @Column(name="token_type")
    private String tokenType;
    @Column(name="expires_in")
    private Integer expiresIn;
}
