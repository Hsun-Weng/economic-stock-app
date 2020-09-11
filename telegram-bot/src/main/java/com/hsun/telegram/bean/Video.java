package com.hsun.telegram.bean;

import lombok.Data;

import java.io.Serializable;

@Data
public class Video implements Serializable {
    private final static long serialVersionUID = 0L;

    private String fileId;
    private String fileUniqueId;
    private Integer width;
    private Integer height;
    private Integer duration;
    private PhotoSize thumb;
    private String mimeType;
    private Integer fileSize;
}
