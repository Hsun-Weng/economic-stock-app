package com.hsun.economic.service;

import com.hsun.economic.bean.CountryBean;
import com.hsun.economic.bean.EconomicDataBean;

import java.util.List;

public interface CountryService {
    List<CountryBean> getCountryList();
    List<EconomicDataBean> getEconomicDataList(String countryCode);
}
