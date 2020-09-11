package com.hsun.telegram.service;

import com.hsun.telegram.bean.SendMessage;
import com.hsun.telegram.bean.Update;

import java.util.List;

public interface TelegramService {
    void handleMessage(Update update);
    SendMessage handleCommand(Update update, String command, List<String> argList);
    void sendMessage(SendMessage sendMessage);
}
