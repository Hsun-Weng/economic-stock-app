package com.hsun.economic.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hsun.economic.entity.TaiwanFuturesContract;

@Repository
public interface TaiwanFuturesContractRepository extends JpaRepository<TaiwanFuturesContract, Integer>{

}
