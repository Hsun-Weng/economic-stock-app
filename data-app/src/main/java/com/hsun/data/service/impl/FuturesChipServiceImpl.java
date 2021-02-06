package com.hsun.data.service.impl;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.hsun.data.bean.FuturesChipBean;
import com.hsun.data.bean.InvestorFuturesChipBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hsun.data.entity.InvestorFuturesChip;
import com.hsun.data.entity.Futures;
import com.hsun.data.entity.FuturesChip;
import com.hsun.data.repository.FuturesChipRepository;
import com.hsun.data.repository.FuturesRepository;
import com.hsun.data.service.FuturesChipService;

@Service
public class FuturesChipServiceImpl implements FuturesChipService {
    
    @Autowired
    private FuturesChipRepository repository;
    
    @Autowired
    private FuturesRepository futuresRepository;

    @Override
    public List<FuturesChipBean> getFuturesChipList(String futuresCode, LocalDate startDate, LocalDate endDate) {
        // 設置查詢起訖時間移至最早 & 最晚
        Date queryStartDate = Date.from(startDate.atTime(0, 0, 0).atZone(ZoneId.systemDefault()).toInstant());
        Date queryEndDate = Date.from(endDate.atTime(23, 59, 59).atZone(ZoneId.systemDefault()).toInstant());
        List<FuturesChip> futuresChipList = repository.findByFuturesCodeAndDateBetween(futuresCode, queryStartDate, queryEndDate);
       
        // 查詢全部未平倉量
        List<Futures> futuresList = futuresRepository.findByFuturesCodeAndDateBetween(futuresCode, queryStartDate, queryEndDate);
        Map<Date, Integer> openInterestLotMap =
                futuresList.stream()
                        .collect(Collectors.groupingBy(Futures::getDate, Collectors.summingInt(Futures::getOpenInterestLot)));

        List<FuturesChipBean> futuresChipBeanList = futuresChipList
                .parallelStream()
                .map((futuresChip)->{
            // 未平倉總量
            Integer openInterestLot = openInterestLotMap.get(futuresChip.getDate());

            List<InvestorFuturesChipBean> investorFuturesChipList = futuresChip.getInvestorFuturesChip()
                    .stream()
                    .map((investorChip)->InvestorFuturesChipBean
                            .builder()
                            .investorCode(investorChip.getInvestorCode())
                            .openInterestLongLot(investorChip.getOpenInterestLongLot())
                            .openInterestShortLot(investorChip.getOpenInterestShortLot())
                            .openInterestNetLot(investorChip.getOpenInterestLongLot()
                                    - investorChip.getOpenInterestShortLot())
                            .percent(new BigDecimal(investorChip.getPercent())
                                    .multiply(new BigDecimal(100))
                                    .setScale(2, RoundingMode.HALF_UP)
                                    .floatValue())
                            .build())
                    .collect(Collectors.toList());

            return new FuturesChipBean(futuresChip.getDate(), futuresChip.getFuturesCode(), openInterestLot
                    , investorFuturesChipList);
        }).sorted((c1, c2)->c2.getDate().compareTo(c1.getDate())).collect(Collectors.toList());
        
        return futuresChipBeanList;
    }

}
