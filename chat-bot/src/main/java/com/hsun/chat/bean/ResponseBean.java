package com.hsun.chat.bean;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class ResponseBean<T> {
    private T data;
}
