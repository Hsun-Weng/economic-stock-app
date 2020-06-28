package com.hsun.telegram.controller;

import com.hsun.telegram.bean.Update;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TelegramController {
    @PostMapping("/receive")
    public void receive(@RequestBody Update update){
        System.out.println(update);
    }
}
