package com.hsun.economic.bean;

import com.google.gson.annotations.SerializedName;
import lombok.Data;

@Data
public class FacebookOauthError {
    private String error;
    private String type;
    private Integer code;
    @SerializedName("error_subcode")
    private Integer errorSubcode;
    @SerializedName("fbtrace_id")
    private String fbtraceId;
}
