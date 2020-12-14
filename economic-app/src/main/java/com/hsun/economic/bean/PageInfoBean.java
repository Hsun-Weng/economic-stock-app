package com.hsun.economic.bean;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Data
public class PageInfoBean<T> {
    private Integer page;
    private Integer size;
    private Integer totalSize;
    private List<T> content;
}
