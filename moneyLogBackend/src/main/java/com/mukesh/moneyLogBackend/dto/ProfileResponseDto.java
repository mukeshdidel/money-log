package com.mukesh.moneyLogBackend.dto;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProfileResponseDto {
    private Long id;
    private String username;
    private String email;
    private String fullName;
}
