package com.hsun.telegram.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties("telegram.bot")
@Data
public class TelegramConfig {
    private String id;
    private String token;
}
