package com.hsun.economic.bean;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@Data
@SuperBuilder
@NoArgsConstructor
public class ProductPriceBean {
    private Integer productType;
    private String productCode;
    private String productName;
    private Integer sort;
    private Date date;
    private Double open;
    private Double low;
    private Double high;
    private Double close;
    private Long volume;
    private Float change;
    private Float changePercent;
}
