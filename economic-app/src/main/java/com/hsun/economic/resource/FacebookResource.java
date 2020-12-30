package com.hsun.economic.resource;

import com.github.lianjiatech.retrofit.spring.boot.annotation.RetrofitClient;
import com.hsun.economic.bean.FacebookOauthBean;
import com.hsun.economic.bean.FacebookUserBean;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.Query;

@RetrofitClient(baseUrl = "${oauth2.facebook.url}")
public interface FacebookResource {
    @GET("oauth/access_token")
    FacebookOauthBean getToken(@Query("redirect_uri") String redirectUri, @Query("client_id") String clientId
            , @Query("client_secret") String clientSecret, @Query("code") String code);
    @GET("me")
    FacebookUserBean getUser(@Header("Authorization") String authorization, @Query("fields") String fields);
}
