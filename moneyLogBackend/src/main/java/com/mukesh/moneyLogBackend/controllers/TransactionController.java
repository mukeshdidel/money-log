package com.mukesh.moneyLogBackend.controllers;


import com.mukesh.moneyLogBackend.dto.TransactionRequestDto;
import com.mukesh.moneyLogBackend.model.Transaction;
import com.mukesh.moneyLogBackend.service.TransactionService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class TransactionController {


    private TransactionService transactionService;

    @PostMapping("/wallet/{walletId}/transaction")
    public ResponseEntity<Transaction> createTransaction(@RequestBody TransactionRequestDto transactionRequestDto, @PathVariable Long walletId) {
        return ResponseEntity.status(HttpStatus.CREATED).body(transactionService.createTransaction(transactionRequestDto, walletId));
    }

    @GetMapping("/transaction")
    public List<Transaction> getAllTransactions() {
        return transactionService.getAllTransactions();

    }

}
