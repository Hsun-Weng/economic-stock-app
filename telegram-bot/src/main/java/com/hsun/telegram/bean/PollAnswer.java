package com.hsun.telegram.bean;

import lombok.Data;

import java.io.Serializable;
import java.util.Arrays;

@Data
public class PollAnswer implements Serializable {
    private final static long serialVersionUID = 0L;

    private String pollId;
    private User user;
    private Integer[] optionIds;
}
