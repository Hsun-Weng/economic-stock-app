package com.hsun.telegram.bean;

import lombok.Data;

import java.io.Serializable;

@Data
public class Audio implements Serializable {
    private final static long serialVersionUID = 0L;

    private String fileId;
    private String fileUniqueId;
    private Integer duration;
    private String performer;
    private String title;
    private String mimeType;
    private Integer fileSize;
    private PhotoSize thumb;
}
