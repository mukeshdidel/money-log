package com.mukesh.moneyLogBackend.exceptions;


import lombok.Data;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Data
public class ApiException {
    private LocalDateTime timeStamp;
    private String error;
    private HttpStatus statusCode;

    public ApiException(String error, HttpStatus statusCode) {
        this.error = error;
        this.statusCode = statusCode;
        this.timeStamp = LocalDateTime.now();
    }
}
