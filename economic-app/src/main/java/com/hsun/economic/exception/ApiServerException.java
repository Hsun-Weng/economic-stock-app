package com.hsun.economic.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class ApiServerException extends RuntimeException {

    public ApiServerException() {
        super("Server's error occurred");
    }

    public ApiServerException(String message) {
        super(message);
    }
}
