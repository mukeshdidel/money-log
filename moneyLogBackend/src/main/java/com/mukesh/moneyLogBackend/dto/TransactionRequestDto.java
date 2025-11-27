package com.mukesh.moneyLogBackend.dto;


import lombok.Data;

@Data
public class TransactionRequestDto {
    private Double amount;
    private Boolean isIncome;
    private String description;
    private Long categoryId;
}
