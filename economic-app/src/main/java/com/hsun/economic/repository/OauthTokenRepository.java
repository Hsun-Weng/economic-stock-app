package com.hsun.economic.repository;

import com.hsun.economic.entity.OauthToken;
import com.hsun.economic.entity.OauthTokenPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OauthTokenRepository extends JpaRepository<OauthToken, OauthTokenPK> {
}
