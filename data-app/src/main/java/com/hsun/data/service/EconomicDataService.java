package com.hsun.data.service;

import java.util.List;

import com.hsun.data.bean.EconomicDataBean;
import com.hsun.data.entity.EconomicData;

public interface EconomicDataService {
    
    List<EconomicDataBean> getDataByCodeAndCountryCode(String countryCode, String dataCode);
}
