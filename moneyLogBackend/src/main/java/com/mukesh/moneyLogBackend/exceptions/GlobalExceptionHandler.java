package com.mukesh.moneyLogBackend.exceptions;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AccountNotActivatedException.class)
    public ResponseEntity<ApiException> handleEmailNotVerifiedException(AccountNotActivatedException ex){
        ApiException apiException = new ApiException(ex.getMessage(), HttpStatus.FORBIDDEN);
        return ResponseEntity.status(apiException.getStatusCode()).body(apiException);
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<ApiException> handleInvalidCredentialsException(InvalidCredentialsException ex){
        ApiException apiException = new ApiException(ex.getMessage(), HttpStatus.FORBIDDEN);
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



    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiException> handleRuntimeException(RuntimeException ex){
        ApiException apiException = new ApiException(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        return ResponseEntity.status(apiException.getStatusCode()).body(apiException);
    }


}
