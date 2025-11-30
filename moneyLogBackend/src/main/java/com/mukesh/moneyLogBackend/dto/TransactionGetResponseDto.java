package com.mukesh.moneyLogBackend.dto;

import com.mukesh.moneyLogBackend.model.Category;
import com.mukesh.moneyLogBackend.model.Wallet;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class TransactionGetResponseDto {
    private Long transactionId;
    private Double amount;
    private Boolean isIncome;
    private LocalDateTime transactionDate;
    private String description;
    private Category category;
    private Wallet wallet;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

