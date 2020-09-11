package com.hsun.telegram.bean;

import lombok.Data;

import java.io.Serializable;

@Data
public class EncryptedCredentials implements Serializable {
    private final static long serialVersionUID = 0L;

    private String data;
    private String hash;
    private String secret;
}
