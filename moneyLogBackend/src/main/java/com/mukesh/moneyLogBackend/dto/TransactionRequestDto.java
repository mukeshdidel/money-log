package com.mukesh.moneyLogBackend.dto;


import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class TransactionRequestDto {
    @Positive(message = "The amount should be greater than 0")
    private Double amount;

    private Boolean isIncome;

    private String description;

    private Long categoryId;
}
