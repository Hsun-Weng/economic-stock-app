package com.hsun.telegram.bean;

import lombok.Data;

import java.io.Serializable;

@Data
public class PollOption implements Serializable {
    private final static long serialVersionUID = 0L;

    private String text;
    private Integer voterCount;
}
