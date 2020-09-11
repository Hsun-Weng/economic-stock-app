package com.hsun.telegram.bean;

import lombok.Data;

import java.io.Serializable;
import java.util.Arrays;

@Data
public class UserProfilePhotos implements Serializable {
    private final static long serialVersionUID = 0L;

    private Integer totalCount;
    private PhotoSize[][] photos;
}
