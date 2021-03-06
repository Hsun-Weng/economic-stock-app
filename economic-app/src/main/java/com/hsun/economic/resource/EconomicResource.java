package com.hsun.economic.resource;

import com.github.lianjiatech.retrofit.spring.boot.annotation.RetrofitClient;
import com.hsun.economic.bean.EconomicValueBean;
import retrofit2.http.GET;
import retrofit2.http.Path;

import java.util.List;

@RetrofitClient(baseUrl = "${service.data.url}")
public interface EconomicResource {
    @GET("economic/{countryCode}/{dataCode}")
    List<EconomicValueBean> getValueList(@Path("countryCode") String countryCode, @Path("dataCode") String dataCode);
}
