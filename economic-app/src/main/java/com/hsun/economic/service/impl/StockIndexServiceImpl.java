package com.hsun.economic.service.impl;

import com.hsun.economic.bean.PriceBean;
import com.hsun.economic.bean.StockIndexBean;
import com.hsun.economic.repository.StockIndexRepository;
import com.hsun.economic.resource.StockIndexResource;
import com.hsun.economic.service.StockIndexService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StockIndexServiceImpl implements StockIndexService {

    @Autowired
    private StockIndexRepository repository;

    @Autowired
    private StockIndexResource stockIndexResource;

    @Override
    public List<StockIndexBean> getStockIndexList() {
        return repository.findAll()
                .stream()
                .map((stockIndex ->
                        new StockIndexBean(stockIndex.getIndexCode(), stockIndex.getIndexName())))
                .collect(Collectors.toList());
    }

    @Override
    public List<PriceBean> getPriceList(String indexCode, LocalDate startDate, LocalDate endDate) {
        return stockIndexResource.getPriceList(indexCode, startDate.format(DateTimeFormatter.ISO_DATE)
                , endDate.format(DateTimeFormatter.ISO_DATE))
                .stream()
                .sorted((p1, p2)->Long.compare(p2.getDate().getTime(), p1.getDate().getTime()))
                .collect(Collectors.toList());
    }
}
