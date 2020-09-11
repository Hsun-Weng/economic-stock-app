package com.hsun.telegram.bean;

import lombok.Data;

import java.io.Serializable;

@Data
public class Document implements Serializable {
    private final static long serialVersionUID = 0L;

    private String fileId;
    private String fileUniqueId;
    private PhotoSize thumb;
    private String fileName;
    private String mimeType;
    private Integer fileSize;
}
