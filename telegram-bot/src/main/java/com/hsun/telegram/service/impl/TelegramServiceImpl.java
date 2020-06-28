package com.hsun.telegram.service.impl;

import com.hsun.telegram.bean.Message;
import com.hsun.telegram.bean.SendMessage;
import com.hsun.telegram.bean.SendResponse;
import com.hsun.telegram.bean.Update;
import com.hsun.telegram.config.TelegramConfig;
import com.hsun.telegram.service.StockService;
import com.hsun.telegram.service.TelegramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class TelegramServiceImpl implements TelegramService {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private TelegramConfig telegramConfig;

    @Autowired
    private StockService stockService;

    @Override
    public void handleMessage(Update update) {
        SendMessage sendMessage = null;
        Message message = update.getMessage();

        Optional<String> messageTextOptional = Optional.ofNullable(update.getMessage().getText());

        String messageText = messageTextOptional.orElse("");
        if(messageText.startsWith("/")) { // is command
            String[] texts = messageText.split(" ");
            String command = texts[0];
            List<String> args = Arrays.asList(texts).subList(1, texts.length);
            sendMessage = handleCommand(update, command, args);
        }

        if(sendMessage != null) {
            sendMessage(sendMessage);
        }
    }

    @Override
    public SendMessage handleCommand(Update update, String command, List<String> argList) {
        SendMessage sendMessage = new SendMessage();
        sendMessage.setChatId(update.getMessage().getChat().getId());
        switch(command) {
            case "/stock":
                if(argList.size() > 0) {
                    String stockCode = argList.get(0);
                    Map<String, Object> stockMap = stockService.findStockLatestPrice(stockCode);
                    if (stockMap != null) {
                        sendMessage.setText(stockMap.toString());
                    } else {
                        sendMessage.setText("Can't find stock no: " + stockCode);
                    }
                }else{
                    sendMessage.setText("Missing stock no argument, ex: /stock 2330");
                }
                break;
            default:
                return null;
        }
        return sendMessage;
    }

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
