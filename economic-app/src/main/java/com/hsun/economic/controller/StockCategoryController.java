package com.hsun.economic.controller;

import com.hsun.economic.bean.StockCategoryBean;
import com.hsun.economic.bean.StockCategoryProportionBean;
import com.hsun.economic.bean.StockPriceBean;
import com.hsun.economic.service.StockCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class StockCategoryController {
    
    @Autowired
    private StockCategoryService service;
    
    @GetMapping("/categories")
    public List<StockCategoryBean> getCategoryList() {
        return service.getCategoryList();
    }
    
    @GetMapping("/category/{categoryCode}/stocks/prices")
    public List<StockPriceBean> getCategoryStockPriceList(@PathVariable String categoryCode) {
        return service.getStockPriceList(categoryCode);
    }

    @GetMapping("/categories/proportion")
    public List<StockCategoryProportionBean> getCategoriesStockProportionRanked() {
        return service.getCategoriesStockProportionRanked();
    }
}
