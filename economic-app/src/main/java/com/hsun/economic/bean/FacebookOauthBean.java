package com.hsun.economic.bean;

import com.google.gson.annotations.SerializedName;
import lombok.Data;

@Data
public class FacebookOauthBean {
    @SerializedName("access_token")
    private String accessToken;
    @SerializedName("token_type")
    private String tokenType;
    @SerializedName("expires_in")
    private Integer expiresIn;
    private FacebookOauthError error;
    private String code;
}
