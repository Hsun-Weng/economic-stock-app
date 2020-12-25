package com.hsun.chat.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class LineServiceTest {

    @Autowired
    private LineService service;

    @Test
    public void testHandleTextMessage(){
        System.out.println(service.handleTextMessage("小台期貨籌碼"));
    }

}
