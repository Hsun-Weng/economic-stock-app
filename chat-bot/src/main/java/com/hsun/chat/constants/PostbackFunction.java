package com.hsun.chat.constants;

public enum PostbackFunction {
    FUTURES_CHIP(0),//查詢未平倉籌碼
    STOCK(1);//查詢個股
    private int type;
    PostbackFunction(int type){
        this.type = type;
    }
    public int getValue(){
        return this.type;
    }
    public static PostbackFunction fromValue(int value){
        for(PostbackFunction postbackFunction: PostbackFunction.values()){
            if(value == postbackFunction.getValue()){
                return postbackFunction;
            }
        }
        return null;
    }
}
