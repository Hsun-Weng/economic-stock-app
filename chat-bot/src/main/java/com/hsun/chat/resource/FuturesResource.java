package com.hsun.chat.resource;

import com.github.lianjiatech.retrofit.spring.boot.annotation.RetrofitClient;
import com.hsun.chat.bean.FuturesChipBean;
import com.hsun.chat.bean.ResponseBean;
import retrofit2.http.GET;
import retrofit2.http.Path;
import retrofit2.http.Query;

import java.util.List;

@RetrofitClient(baseUrl = "${service.data.url}")
public interface FuturesResource {
    @GET("futures/{futuresCode}/chip")
    ResponseBean<List<FuturesChipBean>> getFuturesChipList(@Path("futuresCode") String futuresCode, @Query("startDate") String startDate
            , @Query("endDate") String endDate);
}
