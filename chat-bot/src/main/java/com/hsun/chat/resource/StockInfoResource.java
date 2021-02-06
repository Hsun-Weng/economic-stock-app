package com.hsun.chat.resource;

import com.github.lianjiatech.retrofit.spring.boot.annotation.RetrofitClient;
import com.hsun.chat.bean.StockBean;
import retrofit2.http.GET;
import retrofit2.http.Path;

@RetrofitClient(baseUrl = "${service.economic.url}")
public interface StockInfoResource {
    @GET("stock/{stockCode}")
    StockBean getStock(@Path("stockCode") String stockCode);
}
