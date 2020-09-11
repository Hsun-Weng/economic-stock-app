package com.hsun.telegram.bean;

import lombok.Data;

import java.io.Serializable;

@Data
public class VideoNote implements Serializable {
    private final static long serialVersionUID = 0L;

    private String fileId;
    private String fileUniqueId;
    private Integer length;
    private Integer duration;
    private PhotoSize thumb;
    private Integer fileSize;
}
