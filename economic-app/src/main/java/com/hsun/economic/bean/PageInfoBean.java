package com.hsun.economic.bean;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PageInfoBean<T> {
    private Integer totalPage;
    private Integer page;
    private Integer size;
    private List<T> content;
}
