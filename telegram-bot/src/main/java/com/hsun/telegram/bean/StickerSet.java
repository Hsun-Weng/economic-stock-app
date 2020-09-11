package com.hsun.telegram.bean;

import lombok.Data;

import java.io.Serializable;
import java.util.Arrays;

@Data
public class StickerSet implements Serializable {
    private final static long serialVersionUID = 0L;

    private String name;
    private String title;
    private Boolean isAnimated;
    private Boolean containsMasks;
    private Sticker[] stickers;
    private PhotoSize thumb;
}
