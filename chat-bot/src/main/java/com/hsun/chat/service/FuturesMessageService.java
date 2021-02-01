package com.hsun.chat.service;

import com.hsun.chat.bean.InvestorFuturesChipBean;
import com.linecorp.bot.model.message.flex.container.Bubble;
import com.linecorp.bot.model.message.flex.container.Carousel;

import java.time.LocalDate;
import java.util.Date;

public interface FuturesMessageService {
    Bubble getFuturesChipMenuBubble();
    Carousel getFuturesChipMessage(LocalDate queryDate, String futuresCode);
    Bubble convertFuturesInvestorChipBubble(LocalDate queryDate, String futuresChipName
            , InvestorFuturesChipBean investorChip);
}
