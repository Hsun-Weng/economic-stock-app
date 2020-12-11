package com.hsun.economic.service.impl;

import com.hsun.economic.bean.FuturesBean;
import com.hsun.economic.entity.Futures;
import com.hsun.economic.repository.FuturesRepository;
import com.hsun.economic.service.FuturesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FuturesServiceImpl implements FuturesService {
    
    @Autowired
    private FuturesRepository repository;

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
}
