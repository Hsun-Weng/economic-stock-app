package com.hsun.economic.resource;

import com.github.lianjiatech.retrofit.spring.boot.annotation.RetrofitClient;
import com.hsun.economic.bean.EconomicValueBean;
import com.hsun.economic.bean.ResponseBean;
import retrofit2.http.GET;
import retrofit2.http.Path;

import java.util.List;

@RetrofitClient(baseUrl = "${service.data.url}")
public interface EconomicValueResource {
    @GET("economic/{countryCode}/{dataCode}")
    ResponseBean<List<EconomicValueBean>> getValueList(@Path("countryCode") String countryCode, @Path("dataCode") String dataCode);
}
