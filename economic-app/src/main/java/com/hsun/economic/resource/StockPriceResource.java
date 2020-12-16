package com.hsun.economic.resource;

import com.github.lianjiatech.retrofit.spring.boot.annotation.RetrofitClient;
import com.hsun.economic.bean.ResponseBean;
import com.hsun.economic.bean.StockPriceBean;
import retrofit2.http.GET;
import retrofit2.http.Path;

@RetrofitClient(baseUrl = "${service.data.url}")
public interface StockPriceResource {
    @GET("stock/{stockCode}/price/latest")
    ResponseBean<StockPriceBean> getLatestPrice(@Path("stockCode") String stockCode);
}
