package com.hsun.telegram.bean;

import lombok.Data;

import java.io.Serializable;

@Data
public class Sticker implements Serializable {
    private final static long serialVersionUID = 0L;

    private String fileId;
    private String fileUniqueId;
    private Integer width;
    private Integer height;
    private Boolean isAnimated;
    private PhotoSize thumb;
    private String emoji;
    private String setName;
    private MaskPosition maskPosition;
    private Integer fileSize;
}
