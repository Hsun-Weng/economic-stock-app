package com.hsun.economic.resource;

import com.github.lianjiatech.retrofit.spring.boot.annotation.RetrofitClient;
import com.hsun.economic.bean.ResponseBean;
import com.hsun.economic.bean.StockIndexPriceBean;
import com.hsun.economic.bean.StockPriceBean;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;

import java.util.List;

@RetrofitClient(baseUrl = "${service.data.url}")
public interface StockIndexPriceResource {
    @GET("stock/index/{indexCode}/price/latest")
    ResponseBean<StockIndexPriceBean> getLatestPrice(@Path("indexCode") String indexCode);
    @POST("stock/indexes/price/latest")
    ResponseBean<List<StockIndexPriceBean>> getLatestPriceList(@Body List<String> indexCodeList);
}
