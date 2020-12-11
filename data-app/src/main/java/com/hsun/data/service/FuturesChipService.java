package com.hsun.data.service;

import java.util.Date;
import java.util.List;

import com.hsun.data.bean.FuturesChipBean;
import com.hsun.data.entity.FuturesChip;

public interface FuturesChipService {
    List<FuturesChipBean> getFuturesChipList(String futuresCode, Date startDate, Date endDate);
}
