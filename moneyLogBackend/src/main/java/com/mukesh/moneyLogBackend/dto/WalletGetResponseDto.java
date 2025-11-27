package com.mukesh.moneyLogBackend.dto;

import com.mukesh.moneyLogBackend.model.Transaction;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class WalletGetResponseDto {
    private Long walletId;
    private String name;
    private Double balance;
    private String currency;
    private String description;
    private LocalDateTime updatedAt;
    private List<Transaction> transactions;
}

