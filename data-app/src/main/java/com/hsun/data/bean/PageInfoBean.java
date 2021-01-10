package com.hsun.data.bean;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class PageInfoBean<T> {
    private Integer totalPage;
    private Integer page;
    private Integer size;
    private List<T> content;
}
