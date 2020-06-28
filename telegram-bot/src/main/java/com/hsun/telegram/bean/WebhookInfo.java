package com.hsun.telegram.bean;

import lombok.Data;

import java.io.Serializable;
import java.util.Arrays;

@Data
public class WebhookInfo implements Serializable {
    private final static long serialVersionUID = 0L;

    private String url;
    private Boolean hasCustomCertificate;
    private Integer pendingUpdateCount;
    private Integer lastErrorDate;
    private String lastErrorMessage;
    private Integer maxConnections;
    private String[] allowedUpdates;
}
