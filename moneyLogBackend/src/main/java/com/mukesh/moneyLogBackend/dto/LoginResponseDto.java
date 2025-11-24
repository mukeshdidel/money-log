package com.mukesh.moneyLogBackend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponseDto {
    private String token;
}
