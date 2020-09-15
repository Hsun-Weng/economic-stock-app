package com.hsun.data.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.hsun.data.entity.FuturesChip;

@Repository
public interface FuturesChipRepository extends MongoRepository<FuturesChip, String>{
    @Query("{ 'futuresCode': ?0, 'date': { $gte: ?1, $lte: ?2} }")
    List<FuturesChip> findByFuturesCodeAndDateBetween(String futuresCode, Date startDate, Date endDate);
}