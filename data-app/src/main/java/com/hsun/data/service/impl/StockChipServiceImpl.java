package com.hsun.data.service.impl;

import com.hsun.data.bean.InvestorStockChipBean;
import com.hsun.data.bean.StockChipBean;
import com.hsun.data.entity.StockChip;
import com.hsun.data.repository.StockChipRepository;
import com.hsun.data.service.StockChipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StockChipServiceImpl implements StockChipService {

    @Autowired
    private StockChipRepository repository;

    @Override
    public List<StockChipBean> getStockChipList(String stockCode, Date startDate, Date endDate) {
        LocalDate localStartDate = startDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        Date queryStartDate = Date.from(localStartDate.atTime(0, 0, 0).atZone(ZoneId.systemDefault()).toInstant());
        LocalDate localEndDate = endDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        Date queryEndDate = Date.from(localEndDate.atTime(23, 59, 59).atZone(ZoneId.systemDefault()).toInstant());
        return repository.findByStockCodeAndDateBetween(stockCode, queryStartDate, queryEndDate)
                .stream()
                .map((stockChip -> new StockChipBean(stockChip.getStockCode(),
                        stockChip.getDate(),
                        stockChip.getNetShare(),
                        stockChip.getInvestorStockChip()
                                .stream()
                                .map((investorStockChip ->
                                        new InvestorStockChipBean(investorStockChip.getInvestorCode(),
                                                investorStockChip.getLongShare(),
                                                investorStockChip.getShortShare()))).collect(Collectors.toList()))))
                .collect(Collectors.toList());
    }
}
