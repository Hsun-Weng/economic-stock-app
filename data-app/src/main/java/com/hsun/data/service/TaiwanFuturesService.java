package com.hsun.data.service;

import java.util.Date;
import java.util.List;

import com.hsun.data.entity.TaiwanFutures;

public interface TaiwanFuturesService {
    List<TaiwanFutures> getTaiwanFuturesByFuturesCodeAndContractDateAndDateBetween(String futuresCode, String contractDate, Date startDate, Date endDate);
}
