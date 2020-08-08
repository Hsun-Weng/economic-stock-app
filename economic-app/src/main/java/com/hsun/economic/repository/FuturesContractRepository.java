package com.hsun.economic.repository;


import com.hsun.economic.entity.FuturesContractPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hsun.economic.entity.FuturesContract;

@Repository
public interface FuturesContractRepository extends JpaRepository<FuturesContract, FuturesContractPK>{

}
