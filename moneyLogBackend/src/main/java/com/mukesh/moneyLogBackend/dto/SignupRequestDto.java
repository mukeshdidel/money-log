package com.mukesh.moneyLogBackend.dto;


import lombok.Data;

@Data
public class SignupRequestDto {
    private String fullName;
    private String username;
    private String email;
    private String password;
}
