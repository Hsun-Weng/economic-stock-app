package com.hsun.economic.resource;

import com.github.lianjiatech.retrofit.spring.boot.annotation.RetrofitClient;
import com.hsun.economic.bean.PriceBean;
import com.hsun.economic.bean.StockIndexPriceBean;
import retrofit2.http.*;

import java.util.List;

@RetrofitClient(baseUrl = "${service.data.url}")
public interface StockIndexResource {
    @GET("index/{indexCode}/price/latest")
    StockIndexPriceBean getLatestPrice(@Path("indexCode") String indexCode);
    @GET("index/{indexCode}/prices")
    List<PriceBean> getPriceList(@Path("indexCode") String indexCode, @Query("startDate") String startDate
            , @Query("endDate") String endDate);
    @POST("indexes/price/latest")
    List<StockIndexPriceBean> getLatestPriceList(@Body List<String> indexCodeList);
}
