package com.hsun.economic.resource;

import com.github.lianjiatech.retrofit.spring.boot.annotation.RetrofitClient;
import com.hsun.economic.bean.ResponseBean;
import com.hsun.economic.bean.StockPriceBean;
import retrofit2.http.GET;
import retrofit2.http.Path;

@RetrofitClient(baseUrl = "${service.data.url}")
public interface StockIndexPriceResource {
    @GET("stock/index/{indexCode}/latest")
    ResponseBean<StockPriceBean> getLatestPrice(@Path("indexCode") String indexCode);
}
