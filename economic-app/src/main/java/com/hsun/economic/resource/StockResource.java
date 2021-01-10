package com.hsun.economic.resource;

import com.github.lianjiatech.retrofit.spring.boot.annotation.RetrofitClient;
import com.hsun.economic.bean.*;
import retrofit2.http.*;

import java.util.List;

@RetrofitClient(baseUrl = "${service.data.url}")
public interface StockResource {
    @GET("stock/{stockCode}/price/latest")
    StockPriceBean getLatestPrice(@Path("stockCode") String stockCode);
    @POST("stocks/price/latest")
    List<StockPriceBean> getLatestPriceList(@Body List<String> stockCodeList);
    @GET("stock/{stockCode}/prices")
    List<PriceBean> getPriceList(@Path("stockCode") String stockCode, @Query("startDate") String startDate
            , @Query("endDate") String endDate);
    @GET("stock/{stockCode}/margin")
    List<StockMarginBean> getMarginList(@Path("stockCode") String stockCode, @Query("startDate") String startDate
            , @Query("endDate") String endDate);
    @GET("stock/{stockCode}/chip")
    List<StockChipBean> getChipList(@Path("stockCode") String stockCode, @Query("startDate") String startDate
            , @Query("endDate") String endDate);
    @GET("stocks/rank/price/latest")
    PageInfoBean<StockPriceBean> getStockSortedPage(@Query("sortColumn") String sortColumn
            , @Query("page") Integer page, @Query("size") Integer size, @Query("direction") String direction);
}
