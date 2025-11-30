package com.mukesh.moneyLogBackend.exceptions;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.ArrayList;
import java.util.List;


@RestControllerAdvice
public class GlobalExceptionHandler {


    @ExceptionHandler(AccountNotActivatedException.class)
    public ResponseEntity<ApiException> handleEmailNotVerifiedException(AccountNotActivatedException ex){
        ApiException apiException = new ApiException(ex.getMessage(), HttpStatus.FORBIDDEN);
        return ResponseEntity.status(apiException.getStatusCode()).body(apiException);
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<ApiException> handleInvalidCredentialsException(InvalidCredentialsException ex){
        ApiException apiException = new ApiException(ex.getMessage(), HttpStatus.UNAUTHORIZED);
        return ResponseEntity.status(apiException.getStatusCode()).body(apiException);
    }

    @ExceptionHandler(EmailAlreadyRegisteredException.class)
    public ResponseEntity<ApiException> handleEmailAlreadyRegisteredException(EmailAlreadyRegisteredException ex){
        ApiException apiException = new ApiException(ex.getMessage(), HttpStatus.CONFLICT);
        return ResponseEntity.status(apiException.getStatusCode()).body(apiException);
    }

    @ExceptionHandler(UsernameAlreadyTakenException.class)
    public ResponseEntity<ApiException> handleUsernameAlreadyTakenException(UsernameAlreadyTakenException ex){
        ApiException apiException = new ApiException(ex.getMessage(), HttpStatus.CONFLICT);
        return ResponseEntity.status(apiException.getStatusCode()).body(apiException);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiException> handleInvalidArgsException(MethodArgumentNotValidException ex) {

        List<String> errors = new ArrayList<>();

        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.add(error.getDefaultMessage())
        );

        ApiException apiException = new ApiException(errors.getFirst(), HttpStatus.BAD_REQUEST);
        return ResponseEntity.status(apiException.getStatusCode()).body(apiException);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiException> handleRuntimeException(RuntimeException ex){
        ApiException apiException = new ApiException(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        return ResponseEntity.status(apiException.getStatusCode()).body(apiException);
    }


}
