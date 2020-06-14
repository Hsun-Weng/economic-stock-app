package com.hsun.economic.exception;

import com.hsun.economic.bean.ResponseBean;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

public class ApiClientException extends RuntimeException {

    public ApiClientException(String message) {
        super(message);
    }
}
