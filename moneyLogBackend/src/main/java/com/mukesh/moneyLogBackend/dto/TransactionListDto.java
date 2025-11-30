package com.mukesh.moneyLogBackend.dto;


import java.time.LocalDateTime;

public record TransactionListDto(
        Long transactionId,
        Double amount,
        Boolean isIncome,
        LocalDateTime transactionDate,
        String description,
        Long walletId,
        String walletName,
        String currency,
        Long categoryId,
        String categoryName
) {}
