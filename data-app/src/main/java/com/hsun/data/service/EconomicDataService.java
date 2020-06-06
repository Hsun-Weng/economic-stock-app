package com.hsun.data.service;

import java.util.List;

import com.hsun.data.entity.EconomicData;

public interface EconomicDataService {
    
    List<EconomicData> getByCountryDataCode(String countryCode, String dataCode);
}
