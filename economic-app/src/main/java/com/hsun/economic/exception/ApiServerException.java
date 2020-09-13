package com.hsun.economic.exception;

public class ApiServerException extends RuntimeException {

    public ApiServerException() {
        super("Server's error occurred");
    }

    public ApiServerException(String message) {
        super(message);
    }
}
