package com.hsun.economic.resource;

import com.github.lianjiatech.retrofit.spring.boot.annotation.RetrofitClient;
import com.hsun.economic.bean.FuturesChipBean;
import com.hsun.economic.bean.ResponseBean;
import retrofit2.http.GET;
import retrofit2.http.Path;
import retrofit2.http.Query;

import java.util.List;

@RetrofitClient(baseUrl = "${service.data.url}")
public interface FuturesResource {
    @GET("futures/{futuresCode}/chip")
    ResponseBean<List<FuturesChipBean>> getChipList(@Path("futuresCode") String futuresCode, @Query("startDate") String startDate
            , @Query("endDate") String endDate);
}
