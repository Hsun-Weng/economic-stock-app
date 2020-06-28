package com.hsun.telegram.controller;

import com.hsun.telegram.bean.SendMessage;
import com.hsun.telegram.bean.Update;
import com.hsun.telegram.service.TelegramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TelegramController {

    @Autowired
    private TelegramService service;

    @PostMapping("/receive")
    public void receive(@RequestBody Update update){
        SendMessage sendMessage = new SendMessage();
        sendMessage.setChatId(update.getMessage().getChat().getId());
        sendMessage.setText(update.getMessage().getText());
        service.sendMessage(sendMessage);
    }
}
