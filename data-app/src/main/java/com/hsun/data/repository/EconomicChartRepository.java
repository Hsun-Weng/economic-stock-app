package com.hsun.data.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.hsun.data.entity.EconomicChart;

@Repository
public interface EconomicChartRepository extends MongoRepository<EconomicChart, String> {
    @Query("{ 'data_id': ?0 }")
    EconomicChart findByDataId(Integer dataId);
}
