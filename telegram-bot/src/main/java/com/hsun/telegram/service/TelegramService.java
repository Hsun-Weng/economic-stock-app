package com.hsun.telegram.service;

import com.hsun.telegram.bean.SendMessage;

public interface TelegramService {
    void sendMessage(SendMessage sendMessage);
}
