package com.hsun.telegram.bean;

import lombok.Data;

import java.io.Serializable;

@Data
public class ChatPhoto implements Serializable {
    private final static long serialVersionUID = 0L;

    private String smallFileId;
    private String smallFileUniqueId;
    private String bigFileId;
    private String bigFileUniqueId;
}
