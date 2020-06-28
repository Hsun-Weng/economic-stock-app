package com.hsun.telegram.bean;

import lombok.Data;

import java.io.Serializable;

@Data
public class SendResponse implements Serializable {
    private final static long serialVersionUID = 0L;

    private Boolean ok;
    private Message result;
}
