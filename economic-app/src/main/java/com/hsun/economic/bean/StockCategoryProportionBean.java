package com.hsun.economic.bean;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class StockCategoryProportionBean {
    private String categoryCode;
    private String name;
    private Float proportion;
    private List<StockProportionBean> children;
}
