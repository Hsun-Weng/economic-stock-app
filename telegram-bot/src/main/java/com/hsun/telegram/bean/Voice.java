package com.hsun.telegram.bean;

import java.io.Serializable;

/**
 * stas
 * 10/21/15.
 */
public class Voice implements Serializable {
    private final static long serialVersionUID = 0L;

    private String fileId;
    private String fileUniqueId;
    private Integer duration;
    private String mimeType;
    private Integer fileSize;

    public String fileId() {
        return fileId;
    }

    public String fileUniqueId() {
        return fileUniqueId;
    }

    public Integer duration() {
        return duration;
    }

    public String mimeType() {
        return mimeType;
    }

    public Integer fileSize() {
        return fileSize;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Voice voice = (Voice) o;

        if (fileId != null ? !fileId.equals(voice.fileId) : voice.fileId != null) return false;
        if (fileUniqueId != null ? !fileUniqueId.equals(voice.fileUniqueId) : voice.fileUniqueId != null) return false;
        if (duration != null ? !duration.equals(voice.duration) : voice.duration != null) return false;
        if (mimeType != null ? !mimeType.equals(voice.mimeType) : voice.mimeType != null) return false;
        return fileSize != null ? fileSize.equals(voice.fileSize) : voice.fileSize == null;
    }

    @Override
    public int hashCode() {
        return fileId != null ? fileId.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "Voice{" +
                "fileId='" + fileId + '\'' +
                ", fileUniqueId='" + fileUniqueId + '\'' +
                ", duration=" + duration +
                ", mimeType='" + mimeType + '\'' +
                ", fileSize=" + fileSize +
                '}';
    }
}