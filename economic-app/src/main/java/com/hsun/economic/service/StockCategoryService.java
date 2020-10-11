package com.hsun.economic.service;

import com.hsun.economic.entity.StockCategory;

import java.util.List;
import java.util.Map;

public interface StockCategoryService {
    List<StockCategory> getAllCategories();
    StockCategory getCategoryByCode(String categoryCode);
    List<Map<String, Object>> getCategoriesStockProportionRanked();
}
