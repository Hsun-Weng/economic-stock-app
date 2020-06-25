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
import com.hsun.data.entity.TaiwanFutures;
import com.hsun.data.entity.TaiwanFuturesChip;
import com.hsun.data.repository.TaiwanFuturesChipRepository;
import com.hsun.data.repository.TaiwanFuturesRepository;
import com.hsun.data.service.TaiwanFuturesChipService;

@Service
public class TaiwanFuturesChipServiceImpl implements TaiwanFuturesChipService {
    
    @Autowired
    private TaiwanFuturesChipRepository repository;
    
    @Autowired
    private TaiwanFuturesRepository taiwanFuturesRepository;

    @Override
    public List<TaiwanFuturesChip> getTaiwanFuturesChipByFuturesCodeAndDateBetween(String futuresCode, Date startDate,
            Date endDate) {
        List<TaiwanFuturesChip> taiwanFuturesChipList = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        // 設置查詢起訖時間移至最早 & 最晚
        LocalDate localStartDate = startDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        Date queryStartDate = Date.from(localStartDate.atTime(0, 0, 0).atZone(ZoneId.systemDefault()).toInstant());
        LocalDate localEndDate = endDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        Date queryEndDate = Date.from(localEndDate.atTime(23, 59, 59).atZone(ZoneId.systemDefault()).toInstant());
        taiwanFuturesChipList = repository.findByFuturesCodeAndDateBetween(futuresCode, queryStartDate, queryEndDate);
       
        // 查詢全部未平倉量
        List<TaiwanFutures> taiwanFuturesList = taiwanFuturesRepository.findByFuturesCodeAndDateBetween(futuresCode, queryStartDate, queryEndDate);
        Map<String, Integer> openInterestLotMap = taiwanFuturesList.stream().collect(Collectors.groupingBy((taiwanFutures)->{
            return sdf.format(taiwanFutures.getDate());
        }, Collectors.summingInt(TaiwanFutures::getOpenInterestLot)));
        
        taiwanFuturesChipList.forEach((taiwanFuturesChip)->{
            taiwanFuturesChip.setOpenInterestLot(openInterestLotMap.get(sdf.format(taiwanFuturesChip.getDate())));
            // 未平倉總量
            Integer openInterstLot = taiwanFuturesChip.getOpenInterestLot();
            
            List<InvestorFuturesChip> investorFuturesChipList = taiwanFuturesChip.getInvestorFuturesChip();
            
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
        
        return taiwanFuturesChipList;
    }

}
