package com.hsun.economic.constants;

public enum ProductType {
    INDEX(0),
    STOCK(1),
    FUTURES(2);
    private int type;
    ProductType(int type){
        this.type = type;
    }
    public int getValue(){
        return this.type;
    }
    public static ProductType fromValue(int value){
        for(ProductType productType: ProductType.values()){
            if(value == productType.getValue()){
                return productType;
            }
        }
        return null;
    }
}
