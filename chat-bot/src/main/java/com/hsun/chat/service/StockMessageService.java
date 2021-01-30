package com.hsun.chat.service;

import com.linecorp.bot.model.message.flex.container.Bubble;
import com.linecorp.bot.model.message.flex.container.Carousel;

import java.time.LocalDate;

public interface StockMessageService {
    Bubble getStockMenuBubble();
    Bubble getStockInfoBubble(String stockCode);
    Carousel getStockCarousel(LocalDate queryDate, String stockCode);
    Bubble getStockPriceBubble(LocalDate queryDate, String stockCode);
    Bubble getStockChipBubble(LocalDate queryDate, String stockCode);
    Bubble getStockMarginBubble(LocalDate queryDate, String stockCode);
}
