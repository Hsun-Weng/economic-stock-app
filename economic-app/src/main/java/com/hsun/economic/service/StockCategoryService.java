package com.hsun.economic.service;

import com.hsun.economic.bean.StockCategoryBean;
import com.hsun.economic.bean.StockPriceBean;

import java.util.List;
import java.util.Map;

public interface StockCategoryService {
    List<StockCategoryBean> getCategoryList();
    List<StockPriceBean> getStockPriceList(String categoryCode);
    List<Map<String, Object>> getCategoriesStockProportionRanked();
}
