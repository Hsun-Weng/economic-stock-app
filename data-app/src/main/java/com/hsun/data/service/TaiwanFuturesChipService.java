package com.hsun.data.service;

import java.util.Date;
import java.util.List;

import com.hsun.data.entity.TaiwanFuturesChip;

public interface TaiwanFuturesChipService {
    List<TaiwanFuturesChip> getTaiwanFuturesChipByFuturesCodeAndDateBetween(String futuresCode, Date startDate, Date endDate);
}
