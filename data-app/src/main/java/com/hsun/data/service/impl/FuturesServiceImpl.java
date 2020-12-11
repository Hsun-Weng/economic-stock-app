package com.hsun.data.service.impl;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import com.hsun.data.bean.FuturesPriceBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hsun.data.entity.Futures;
import com.hsun.data.repository.FuturesRepository;
import com.hsun.data.service.FuturesService;

@Service
public class FuturesServiceImpl implements FuturesService {

    @Autowired
    private FuturesRepository repository;
    
    @Override
    public List<FuturesPriceBean> getFuturesPriceList(String futuresCode,
                                                      String contractDate, Date startDate, Date endDate) {
        LocalDate localStartDate = startDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        Date queryStartDate = Date.from(localStartDate.atTime(0, 0, 0).atZone(ZoneId.systemDefault()).toInstant());
        LocalDate localEndDate = endDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        Date queryEndDate = Date.from(localEndDate.atTime(23, 59, 59).atZone(ZoneId.systemDefault()).toInstant());
        return repository.findByFuturesCodeAndContractDateAndDateBetween(futuresCode, contractDate
                , queryStartDate, queryEndDate)
                .stream()
                .map((price)->FuturesPriceBean.builder()
                        .date(price.getDate())
                        .futuresCode(price.getFuturesCode())
                        .contractDate(price.getContractDate())
                        .open(price.getOpen())
                        .low(price.getLow())
                        .high(price.getHigh())
                        .close(price.getClose())
                        .volume(price.getVolume())
                        .build())
                .collect(Collectors.toList());
    }
    
}
