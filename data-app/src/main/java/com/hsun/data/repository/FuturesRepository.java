package com.hsun.data.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.hsun.data.entity.Futures;

@Repository
public interface FuturesRepository extends MongoRepository<Futures, String>{
    @Query("{ 'futuresCode': ?0, 'date': { $gte: ?1, $lte: ?2} }")
    public List<Futures> findByFuturesCodeAndDateBetween(String futuresCode, Date startDate, Date endDate);
    @Query("{ 'futuresCode': ?0, 'contractDate': ?1, 'date': { $gte: ?2, $lte: ?3} }")
    public List<Futures> findByFuturesCodeAndContractDateAndDateBetween(String futuresCode, String contractDate, Date startDate, Date endDate);
}
