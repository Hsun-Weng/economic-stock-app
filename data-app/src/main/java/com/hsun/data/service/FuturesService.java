package com.hsun.data.service;

import java.util.Date;
import java.util.List;

import com.hsun.data.bean.FuturesPriceBean;
import com.hsun.data.entity.Futures;

public interface FuturesService {
    List<FuturesPriceBean> getFuturesPriceList(String futuresCode, String contractDate, Date startDate, Date endDate);
}
