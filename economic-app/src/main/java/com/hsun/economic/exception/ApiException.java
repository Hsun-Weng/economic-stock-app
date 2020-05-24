package com.hsun.economic.exception;

import com.hsun.economic.bean.ResponseBean;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ApiException extends RuntimeException {

    public ApiException(String message) {
        super(message);
    }
}
