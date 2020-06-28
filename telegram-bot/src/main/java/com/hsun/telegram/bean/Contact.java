package com.hsun.telegram.bean;

import lombok.Data;

import java.io.Serializable;

@Data
public class Contact implements Serializable {
    private final static long serialVersionUID = 0L;

    private String phoneNumber;
    private String firstName;
    private String lastName;
    private Integer userId;
    private String vcard;
}
