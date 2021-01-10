package com.hsun.economic.service;

import com.hsun.economic.bean.StockCategoryBean;
import com.hsun.economic.bean.StockCategoryProportionBean;
import com.hsun.economic.bean.StockPriceBean;

import java.util.List;

public interface StockCategoryService {
    List<StockCategoryBean> getCategoryList();
    List<StockPriceBean> getStockPriceList(String categoryCode);
    List<StockCategoryProportionBean> getCategoriesStockProportionRanked();
}
