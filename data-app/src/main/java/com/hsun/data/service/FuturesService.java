package com.hsun.data.service;

import java.util.Date;
import java.util.List;

import com.hsun.data.entity.Futures;

public interface FuturesService {
    List<Futures> getFuturesByCodeAndContractDateAndDateBetween(String futuresCode, String contractDate, Date startDate, Date endDate);
}
