package com.hsun.data.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.hsun.data.entity.Futures;

@Repository
public interface FuturesRepository extends MongoRepository<Futures, String>{
    List<Futures> findByFuturesCodeAndDateBetween(String futuresCode, Date startDate, Date endDate);
    List<Futures> findByFuturesCodeAndContractDateAndDateBetween(String futuresCode, String contractDate, Date startDate, Date endDate);
}
