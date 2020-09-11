package com.hsun.telegram.bean;

import lombok.Data;

import java.io.Serializable;

@Data
public class User implements Serializable {
    private final static long serialVersionUID = 0L;

    private Integer id;
    private Boolean isBot;
    private String firstName;
    private String lastName;
    private String username;
    private String languageCode;
    private Boolean canJoinGroups;
    private Boolean canReadAllGroupMessages;
    private Boolean supportsInlineQueries;
}