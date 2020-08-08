package com.hsun.economic.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hsun.economic.entity.StockCategory;
import com.hsun.economic.repository.StockCategoryRepository;
import com.hsun.economic.service.StockCategoryService;

@Service
public class StockCategoryServiceImpl implements StockCategoryService {
    
    @Autowired
    private StockCategoryRepository repository;

    @Override
    public List<StockCategory> getAllCategories() {
        return repository.findAll();
    }

    @Override
    public StockCategory getCategoryByCode(String categoryCode) {
        return repository.findById(categoryCode).orElse(null);
    }

}
