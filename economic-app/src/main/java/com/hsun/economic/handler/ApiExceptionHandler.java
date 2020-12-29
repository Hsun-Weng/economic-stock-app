package com.hsun.economic.handler;

import com.hsun.economic.bean.ErrorMessage;
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
    public ErrorMessage handleApiClientException(ApiClientException e) {
        return new ErrorMessage(e.getMessage());
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(ApiServerException.class)
    public ErrorMessage handleApiServerException(ApiServerException e) {
        return new ErrorMessage(e.getMessage());
    }

    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(DuplicateException.class)
    public ErrorMessage handleDuplicateException(DuplicateException e) { return new ErrorMessage(e.getMessage()); }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(ResourceNotFoundException.class)
    public ErrorMessage handleResourceNotFoundException(ResourceNotFoundException e) {
        return new ErrorMessage(e.getMessage());
    }

}
