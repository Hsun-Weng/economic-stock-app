package com.hsun.data.bean;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@AllArgsConstructor
@Data
public class EconomicDataBean {
    private Date date;
    private Long value;
}
