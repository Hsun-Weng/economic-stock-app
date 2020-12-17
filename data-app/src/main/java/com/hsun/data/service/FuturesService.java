package com.hsun.data.service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import com.hsun.data.bean.FuturesPriceBean;
import com.hsun.data.entity.Futures;

public interface FuturesService {
    List<FuturesPriceBean> getFuturesPriceList(String futuresCode, String contractDate, LocalDate startDate, LocalDate endDate);
}
