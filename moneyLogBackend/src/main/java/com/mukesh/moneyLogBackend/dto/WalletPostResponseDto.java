package com.mukesh.moneyLogBackend.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class WalletPostResponseDto {
    private Long walletId;
    private String name;
    private Double balance;
    private String currency;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
