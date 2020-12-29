package com.hsun.economic.handler;

import com.hsun.economic.exception.ApiClientException;
import com.hsun.economic.exception.ApiServerException;
import com.hsun.economic.exception.DuplicateException;
import com.hsun.economic.exception.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApiExceptionHandler {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(ApiClientException.class)
    public String handleApiClientException(ApiClientException e) {
        return e.getMessage();
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(ApiServerException.class)
    public String handleApiServerException(ApiServerException e) {
        return e.getMessage();
    }

    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(DuplicateException.class)
    public String handleDuplicateException(DuplicateException e) { return e.getMessage(); }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(ResourceNotFoundException.class)
    public String handleResourceNotFoundException(ResourceNotFoundException e) {
        return e.getMessage();
    }

}
