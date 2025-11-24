package com.mukesh.moneyLogBackend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SignupResponseDto {
    private Long id;
    private String fullName;
    private String username;
    private String email;
}
