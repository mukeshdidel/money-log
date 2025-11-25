package com.mukesh.moneyLogBackend.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;


@Data
@Builder
public class WalletGetResponseDto {
    private Long walletId;
    private String name;
    private Double balance;
    private String currency;
    private String description;
    private LocalDateTime updatedAt;
}
