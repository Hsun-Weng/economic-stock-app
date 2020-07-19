package com.hsun.telegram.bean;

import lombok.Data;

import java.io.Serializable;

@Data
public class Dice implements Serializable {
    private final static long serialVersionUID = 0L;

    private String emoji;
    private Integer value;
}