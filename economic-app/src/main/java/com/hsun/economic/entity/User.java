package com.hsun.economic.entity;

import java.io.Serializable;

import javax.persistence.*;

import lombok.Data;


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
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="id")
	private Integer id;

	@Column(name="user_name")
	private String userName;
	
	@Column(name="password")
    private String password;

	@Column(name="first_name")
	private String firstName;

	@Column(name="last_name")
	private String lastName;
}