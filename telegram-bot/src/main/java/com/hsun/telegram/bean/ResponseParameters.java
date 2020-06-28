package com.hsun.telegram.bean;

import java.io.Serializable;

/**
 * Stas Parshin
 * 03 October 2016
 */
public class ResponseParameters implements Serializable {
    private final static long serialVersionUID = 0L;

    private Long migrateToChatId;
    private Integer retryAfter;

    public Long migrateToChatId() {
        return migrateToChatId;
    }

    public Integer retryAfter() {
        return retryAfter;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ResponseParameters that = (ResponseParameters) o;

        if (migrateToChatId != null ? !migrateToChatId.equals(that.migrateToChatId) : that.migrateToChatId != null)
            return false;
        return retryAfter != null ? retryAfter.equals(that.retryAfter) : that.retryAfter == null;
    }

    @Override
    public int hashCode() {
        int result = migrateToChatId != null ? migrateToChatId.hashCode() : 0;
        result = 31 * result + (retryAfter != null ? retryAfter.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "ResponseParameters{" +
                "migrateToChatId=" + migrateToChatId +
                ", retryAfter=" + retryAfter +
                '}';
    }
}
