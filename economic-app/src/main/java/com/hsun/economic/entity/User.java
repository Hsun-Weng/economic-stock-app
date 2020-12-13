package com.hsun.economic.entity;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


/**
 * The persistent class for the country database table.
 * 
 */
@Entity
@Data
@NamedQuery(name="User.findAll", query="SELECT u FROM User u")
public class User implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="user_name")
	private String userName;
	
	@Column(name="password")
    private String password;

	@Column(name="first_name")
	private String firstName;

	@Column(name="last_name")
	private String lastName;

	@OneToMany(orphanRemoval = true)
	@JoinColumn(name="user_name")
	@ToString.Exclude
	private List<UserPortfolio> userPortfolioList = new ArrayList<>();

	@OneToMany(orphanRemoval = true)
	@JoinColumn(name="user_name")
	@ToString.Exclude
	private List<OauthToken> oauthTokenList = new ArrayList<>();
}