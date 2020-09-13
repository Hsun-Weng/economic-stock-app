package com.hsun.economic.bean;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.gson.annotations.SerializedName;
import lombok.Data;

@Data
public class OauthError {
    @JsonProperty("error")
    private String error;
    @JsonProperty("type")
    private String type;
    @JsonProperty("code")
    private Integer code;
    @JsonProperty("error_subcode")
    private Integer errorSubcode;
    @JsonProperty("fbtrace_id")
    private String fbtraceId;
}
