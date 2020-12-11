package com.hsun.economic.controller;

import com.hsun.economic.bean.ResponseBean;
import com.hsun.economic.entity.StockCategory;
import com.hsun.economic.exception.ApiServerException;
import com.hsun.economic.service.StockCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class StockCategoryController {
    
    @Autowired
    private StockCategoryService service;
    
    @GetMapping("/categories")
    public ResponseBean getCategoryList() {
        ResponseBean responseBean = new ResponseBean();
        List<StockCategory> categoryList = null;
        List<Map<String, Object>> dataList = null;
        try {
            responseBean.setData(service.getCategoryList());
        }catch(Exception e) {
            throw new ApiServerException();
        }
        return responseBean;
    }
    
    @GetMapping("/category/{categoryCode}/stocks")
    public ResponseBean getCategoryStockList(@PathVariable String categoryCode) {
        ResponseBean responseBean = new ResponseBean();
        try {
            responseBean.setData(service.getStockList(categoryCode));
        }catch(Exception e) {
            throw new ApiServerException();
        }
        return responseBean;
    }

    @GetMapping("/categories/proportion")
    public ResponseBean getCategoriesStockProportionRanked() {
        ResponseBean responseBean = new ResponseBean();
        List<Map<String, Object>> dataList = null;
        try {
            dataList = service.getCategoriesStockProportionRanked();

            responseBean.setData(dataList);

        }catch(Exception e) {
            e.printStackTrace();
            throw new ApiServerException();
        }
        return responseBean;
    }
}
