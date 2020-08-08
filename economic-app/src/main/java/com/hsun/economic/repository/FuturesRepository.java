package com.hsun.economic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hsun.economic.entity.Futures;

import java.util.Optional;

public interface FuturesRepository extends JpaRepository<Futures, String>{
}
