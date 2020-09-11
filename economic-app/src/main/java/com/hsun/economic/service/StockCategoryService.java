package com.hsun.economic.service;

import java.util.List;

import com.hsun.economic.entity.StockCategory;

public interface StockCategoryService {
    List<StockCategory> getAllCategories();
    StockCategory getCategoryByCode(String categoryCode);
}
