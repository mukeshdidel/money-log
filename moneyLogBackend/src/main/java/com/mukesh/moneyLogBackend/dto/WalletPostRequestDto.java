package com.mukesh.moneyLogBackend.dto;

import lombok.Data;

@Data
public class WalletPostRequestDto {
    private String name;
    private Double balance;
    private String currency;
    private String description;
}
