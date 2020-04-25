package com.hsun.economic.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hsun.economic.entity.TaiwanStockCategory;
import com.hsun.economic.repository.TaiwanStockCategoryRepository;
import com.hsun.economic.service.TaiwanStockCategoryService;

@Service
public class TaiwanStockCategoryServiceImpl implements TaiwanStockCategoryService {
    
    @Autowired
    private TaiwanStockCategoryRepository repository;

    @Override
    public List<TaiwanStockCategory> getAllCategories() {
        return repository.findAll();
    }

    @Override
    public List<TaiwanStockCategory> getCategoryByCode(String categoryCode) {
        return repository.findByCategoryCode(categoryCode);
    }

}
