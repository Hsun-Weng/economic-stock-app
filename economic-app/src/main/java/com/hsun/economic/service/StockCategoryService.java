package com.hsun.economic.service;

import com.hsun.economic.bean.StockBean;
import com.hsun.economic.bean.StockCategoryBean;

import java.util.List;
import java.util.Map;

public interface StockCategoryService {
    List<StockCategoryBean> getCategoryList();
    List<StockBean> getStockList(String categoryCode);
    List<Map<String, Object>> getCategoriesStockProportionRanked();
}
