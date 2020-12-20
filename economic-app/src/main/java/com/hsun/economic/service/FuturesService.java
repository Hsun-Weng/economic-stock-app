package com.hsun.economic.service;

import com.hsun.economic.bean.FuturesBean;
import com.hsun.economic.bean.FuturesChipBean;
import com.hsun.economic.entity.Futures;

import java.time.LocalDate;
import java.util.List;

public interface FuturesService {
    
    List<FuturesBean> getFuturesList();
    Futures getFuturesByCode(String futuresCode);
    List<FuturesChipBean> getFuturesChipList(String futuresCode, LocalDate startDate, LocalDate endDate);
}
