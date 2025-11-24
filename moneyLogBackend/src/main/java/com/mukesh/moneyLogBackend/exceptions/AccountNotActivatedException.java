package com.mukesh.moneyLogBackend.exceptions;

public class AccountNotActivatedException extends RuntimeException{
    public AccountNotActivatedException() {
        super("Account is not Activated. Please verify your email before logging in.");
    }
}
