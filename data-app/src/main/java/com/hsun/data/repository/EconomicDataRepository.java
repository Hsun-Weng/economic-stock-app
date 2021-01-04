package com.hsun.data.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.hsun.data.entity.EconomicData;

@Repository
public interface EconomicDataRepository extends MongoRepository<EconomicData, String> {
    List<EconomicData> findByCountryCodeAndDataCode(String countryCode, String dataCode);
}
