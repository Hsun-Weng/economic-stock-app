package com.hsun.data.service;

import java.util.Date;
import java.util.List;

import com.hsun.data.entity.FuturesChip;

public interface FuturesChipService {
    List<FuturesChip> getFuturesChipByCodeAndDateBetween(String futuresCode, Date startDate, Date endDate);
}
