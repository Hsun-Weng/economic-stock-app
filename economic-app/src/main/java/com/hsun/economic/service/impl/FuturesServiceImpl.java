package com.hsun.economic.service.impl;

import com.hsun.economic.bean.FuturesBean;
import com.hsun.economic.bean.FuturesChipBean;
import com.hsun.economic.bean.PriceBean;
import com.hsun.economic.entity.Futures;
import com.hsun.economic.exception.ApiClientException;
import com.hsun.economic.repository.FuturesRepository;
import com.hsun.economic.resource.FuturesResource;
import com.hsun.economic.resource.StockIndexResource;
import com.hsun.economic.service.FuturesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class FuturesServiceImpl implements FuturesService {
    
    @Autowired
    private FuturesRepository repository;

    @Autowired
    private FuturesResource futuresResource;

    @Autowired
    private StockIndexResource stockIndexResource;

    @Override
    public List<FuturesBean> getFuturesList() {
        return repository.findAll()
                .stream()
                .map((futures)->
                        new FuturesBean(futures.getFuturesCode(), futures.getFuturesName()
                                , futures.getStockIndex().getIndexCode()))
                .collect(Collectors.toList());
    }

    @Override
    public Futures getFuturesByCode(String futuresCode) {
        return repository.findById(futuresCode).orElse(null);
    }

    @Override
    public List<FuturesChipBean> getFuturesChipList(String futuresCode, LocalDate startDate, LocalDate endDate) {
        Futures futures = repository.findById(futuresCode)
                .orElseThrow(()->new ApiClientException("Futures not found"));

        Map<Long, PriceBean> datePriceMap = stockIndexResource.getPriceList(futures.getStockIndex().getIndexCode()
                , startDate.format(DateTimeFormatter.ISO_DATE), endDate.format(DateTimeFormatter.ISO_DATE)).getData()
                .parallelStream()
                .collect(Collectors.toMap((price)->price.getDate().getTime(), Function.identity()));

        return  futuresResource.getChipList(futuresCode, startDate.format(DateTimeFormatter.ISO_DATE)
                    , endDate.format(DateTimeFormatter.ISO_DATE)).getData()
                .parallelStream()
                .map((chip)->{
                    if(datePriceMap.containsKey(chip.getDate().getTime())) {
                        chip.setClose(datePriceMap.get(chip.getDate().getTime()).getClose());
                    }
                    return chip;
                })
                .sorted((c1, c2)->Long.compare(c2.getDate().getTime(), c1.getDate().getTime()))
                .collect(Collectors.toList());
    }
}
