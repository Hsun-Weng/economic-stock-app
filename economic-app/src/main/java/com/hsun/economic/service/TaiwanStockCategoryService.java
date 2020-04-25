package com.hsun.economic.service;

import java.util.List;

import com.hsun.economic.entity.TaiwanStockCategory;

public interface TaiwanStockCategoryService {
    List<TaiwanStockCategory> getAllCategories();
    List<TaiwanStockCategory> getCategoryByCode(String categoryCode);
}
