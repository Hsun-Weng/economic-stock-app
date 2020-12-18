package com.hsun.economic.bean;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class StockCategoryProportionBean {
    private String categoryCode;
    private String categoryName;
    private Double proportion;
    private List<StockProportionBean> children;
}
