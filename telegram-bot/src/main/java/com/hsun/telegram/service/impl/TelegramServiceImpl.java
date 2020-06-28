package com.hsun.telegram.service.impl;

import com.hsun.telegram.bean.SendMessage;
import com.hsun.telegram.bean.SendResponse;
import com.hsun.telegram.config.TelegramConfig;
import com.hsun.telegram.service.TelegramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Map;

@Service
public class TelegramServiceImpl implements TelegramService {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private TelegramConfig telegramConfig;

    @Override
    public void sendMessage(SendMessage sendMessage) {
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));

        SendResponse response = restTemplate.postForObject(telegramConfig.getSendApi(), sendMessage, SendResponse.class);

        if(!response.getOk()){
            throw new RuntimeException("Send Server Error");
        }

    }
}
