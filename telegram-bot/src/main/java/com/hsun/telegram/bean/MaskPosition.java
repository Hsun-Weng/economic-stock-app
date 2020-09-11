package com.hsun.telegram.bean;

import lombok.Data;

import java.io.Serializable;

@Data
public class MaskPosition implements Serializable {
    private final static long serialVersionUID = 0L;

    private String point;
    private Float xShift, yShift;
    private Float scale;
}
