package com.hsun.data.service.impl;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
    public List<FuturesChip> getFuturesChipByCodeAndDateBetween(String futuresCode, Date startDate,
                                                                             Date endDate) {
        List<FuturesChip> futuresChipList = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        // 設置查詢起訖時間移至最早 & 最晚
        LocalDate localStartDate = startDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        Date queryStartDate = Date.from(localStartDate.atTime(0, 0, 0).atZone(ZoneId.systemDefault()).toInstant());
        LocalDate localEndDate = endDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        Date queryEndDate = Date.from(localEndDate.atTime(23, 59, 59).atZone(ZoneId.systemDefault()).toInstant());
        futuresChipList = repository.findByFuturesCodeAndDateBetween(futuresCode, queryStartDate, queryEndDate);
       
        // 查詢全部未平倉量
        List<Futures> futuresList = futuresRepository.findByFuturesCodeAndDateBetween(futuresCode, queryStartDate, queryEndDate);
        Map<String, Integer> openInterestLotMap = futuresList.stream().collect(Collectors.groupingBy((futures)->{
            return sdf.format(futures.getDate());
        }, Collectors.summingInt(Futures::getOpenInterestLot)));

        futuresChipList.forEach((futuresChip)->{
            futuresChip.setOpenInterestLot(openInterestLotMap.get(sdf.format(futuresChip.getDate())));
            // 未平倉總量
            Integer openInterstLot = futuresChip.getOpenInterestLot();
            
            List<InvestorFuturesChip> investorFuturesChipList = futuresChip.getInvestorFuturesChip();
            
            // 三大法人未平倉
            Integer corporationLongLot = investorFuturesChipList.stream().mapToInt(InvestorFuturesChip::getOpenInterestLongLot).sum();
            Integer corporationShortLot = investorFuturesChipList.stream().mapToInt(InvestorFuturesChip::getOpenInterestShortLot).sum();
            
            // 未平倉總量 - 三大法人多空未平倉 = 散戶未平倉
            Integer retailOpenInterestLongLot = openInterstLot - corporationLongLot;
            Integer retailOpenInterestShortLot = openInterstLot - corporationShortLot;
            
            InvestorFuturesChip retailChip = new InvestorFuturesChip();
            retailChip.setInvestorCode("RI");
            retailChip.setOpenInterestLongLot(retailOpenInterestLongLot);
            retailChip.setOpenInterestShortLot(retailOpenInterestShortLot);
            
            investorFuturesChipList.add(retailChip);
        });
        
        return futuresChipList;
    }

}
