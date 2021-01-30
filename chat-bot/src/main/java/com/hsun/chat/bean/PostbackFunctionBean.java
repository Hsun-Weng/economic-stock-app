package com.hsun.chat.bean;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class PostbackFunctionBean {
    // 執行函式名稱
    private Integer functionCode;
    // 值(By 各function而定)
    private String value;
}
