package com.hsun.economic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hsun.economic.entity.Country;

@Repository
public interface CountryRepository extends JpaRepository<Country, String>{

}
