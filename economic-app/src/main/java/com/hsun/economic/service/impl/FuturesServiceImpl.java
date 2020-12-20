package com.hsun.economic.service.impl;

import com.hsun.economic.bean.FuturesBean;
import com.hsun.economic.bean.FuturesChipBean;
import com.hsun.economic.bean.PriceBean;
import com.hsun.economic.entity.Futures;
import com.hsun.economic.exception.ApiClientException;
import com.hsun.economic.repository.FuturesRepository;
import com.hsun.economic.resource.FuturesChipResource;
import com.hsun.economic.resource.StockIndexPriceResource;
import com.hsun.economic.service.FuturesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class FuturesServiceImpl implements FuturesService {
    
    @Autowired
    private FuturesRepository repository;

    @Autowired
    private FuturesChipResource chipResource;

    @Autowired
    private StockIndexPriceResource stockIndexPriceResource;

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

        Map<Long, PriceBean> datePriceMap = stockIndexPriceResource.getPriceList(futures.getStockIndex().getIndexCode()
                , startDate.format(DateTimeFormatter.ISO_DATE), endDate.format(DateTimeFormatter.ISO_DATE)).getData()
                .parallelStream()
                .collect(Collectors.toMap((price)->price.getDate().getTime(), Function.identity()));

        return  chipResource.getChipList(futuresCode, startDate.format(DateTimeFormatter.ISO_DATE)
                    , endDate.format(DateTimeFormatter.ISO_DATE)).getData()
                .parallelStream()
                .map((chip)->{
                    if(datePriceMap.containsKey(chip.getDate().getTime())) {
                        chip.setClose(datePriceMap.get(chip.getDate().getTime()).getClose());
                    }
                    return chip;
                }).sorted(Comparator.comparing(FuturesChipBean::getDate))
                .collect(Collectors.toList());
    }
}
