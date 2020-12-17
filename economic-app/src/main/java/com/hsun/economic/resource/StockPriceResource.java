package com.hsun.economic.resource;

import com.github.lianjiatech.retrofit.spring.boot.annotation.RetrofitClient;
import com.hsun.economic.bean.PriceBean;
import com.hsun.economic.bean.ResponseBean;
import com.hsun.economic.bean.StockPriceBean;
import retrofit2.http.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RetrofitClient(baseUrl = "${service.data.url}")
public interface StockPriceResource {
    @GET("stock/{stockCode}/price/latest")
    ResponseBean<StockPriceBean> getLatestPrice(@Path("stockCode") String stockCode);
    @POST("stocks/price/latest")
    ResponseBean<List<StockPriceBean>> getLatestPriceList(@Body List<String> stockCodeList);
    @GET("stock/{stockCode}/prices")
    ResponseBean<List<PriceBean>> getPriceList(@Path("stockCode") String stockCode, @Query("startDate") String startDate
            , @Query("endDate") String endDate);
}
