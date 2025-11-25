package com.mukesh.moneyLogBackend.controllers;


import com.mukesh.moneyLogBackend.Repository.WalletRepo;
import com.mukesh.moneyLogBackend.dto.WalletGetResponseDto;
import com.mukesh.moneyLogBackend.dto.WalletPostRequestDto;
import com.mukesh.moneyLogBackend.dto.WalletPostResponseDto;
import com.mukesh.moneyLogBackend.model.Wallet;
import com.mukesh.moneyLogBackend.service.WalletService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class WalletController {

    private final WalletService walletService;

    @GetMapping("/wallet")
    public ResponseEntity<List<WalletGetResponseDto>> retrieveAllWallets(){
        return ResponseEntity.status(HttpStatus.OK).body(walletService.retrieveWalletsByUser());
    }

    @PostMapping("/wallet")
    public ResponseEntity<WalletPostResponseDto> createWallet(@RequestBody WalletPostRequestDto walletPostRequestDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(walletService.createWallet(walletPostRequestDto));
    }
}
