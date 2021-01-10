package com.hsun.chat.resource;

import com.github.lianjiatech.retrofit.spring.boot.annotation.RetrofitClient;
import com.hsun.chat.bean.StockChipBean;
import com.hsun.chat.bean.StockMarginBean;
import com.hsun.chat.bean.StockPriceBean;
import retrofit2.http.GET;
import retrofit2.http.Path;
import retrofit2.http.Query;

import java.util.List;

@RetrofitClient(baseUrl = "${service.data.url}")
public interface StockResource {
    @GET("stock/{stockCode}/prices")
    List<StockPriceBean> getStockPriceList(@Path("stockCode") String stockCode, @Query("startDate") String startDate
            , @Query("endDate") String endDate);
    @GET("stock/{stockCode}/chip")
    List<StockChipBean> getStockChipList(@Path("stockCode") String stockCode, @Query("startDate") String startDate
            , @Query("endDate") String endDate);
    @GET("stock/{stockCode}/margin")
    List<StockMarginBean> getStockMarginList(@Path("stockCode") String stockCode, @Query("startDate") String startDate
            , @Query("endDate") String endDate);
}
