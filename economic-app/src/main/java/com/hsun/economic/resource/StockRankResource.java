package com.hsun.economic.resource;

import com.github.lianjiatech.retrofit.spring.boot.annotation.RetrofitClient;
import com.hsun.economic.bean.ResponseBean;
import com.hsun.economic.bean.StockPriceBean;
import org.springframework.data.domain.Page;
import retrofit2.http.GET;
import retrofit2.http.Query;

@RetrofitClient(baseUrl = "${service.data.url}")
public interface StockRankResource {
    @GET("stock/latest/rank")
    ResponseBean<Page<StockPriceBean>> getStockSortedPage(@Query("sortColumn") String sortColumn, @Query("page") Integer page
            , @Query("size") Integer size, @Query("direction") String direction);
}
