package com.mukesh.moneyLogBackend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class WalletPostRequestDto {

    @NotBlank(message = "Wallet name is required")
    private String name;

    @NotBlank(message = "Balance is required")
    @Positive(message = "balance can't be negative")
    private Double balance;

    @NotBlank(message = "currency is required")
    private String currency;

    @NotBlank(message = "description is required")
    private String description;
}
