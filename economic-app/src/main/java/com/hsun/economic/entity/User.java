package com.hsun.economic.entity;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;
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

	@OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH}, orphanRemoval = true)
	@JoinColumn(name="user_name")
	@ToString.Exclude
	@Setter(AccessLevel.NONE)
	private List<UserPortfolio> userPortfolioList = new ArrayList<>();

	@OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH}, orphanRemoval = true)
	@JoinColumn(name="user_name")
	@ToString.Exclude
	@Setter(AccessLevel.NONE)
	private List<OauthToken> oauthTokenList = new ArrayList<>();

	public void setUserPortfolioList(List<UserPortfolio> userPortfolioList) {
		this.userPortfolioList.clear();
		if(userPortfolioList!=null){
			this.userPortfolioList.addAll(userPortfolioList);
		}
	}

	public void setOauthTokenList(List<OauthToken> oauthTokenList) {
		this.oauthTokenList.clear();
		if(oauthTokenList!=null){
			this.oauthTokenList.addAll(oauthTokenList);
		}
	}
}