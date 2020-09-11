package com.hsun.telegram.bean;

import lombok.Data;

@Data
public class EncryptedPassportElement {
    private String type;
    private String data;
    private String phoneNumber;
    private String email;
    private PassportFile[] files;
    private PassportFile frontSide;
    private PassportFile reverseSide;
    private PassportFile selfie;
    private PassportFile[] translation;
    private String hash;
}
