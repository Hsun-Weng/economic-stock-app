package com.hsun.telegram.bean;

import lombok.Data;

import java.io.Serializable;

@Data
public class PassportData implements Serializable {
    private final static long serialVersionUID = 0L;

    private EncryptedPassportElement[] data;
    private EncryptedCredentials credentials;
}