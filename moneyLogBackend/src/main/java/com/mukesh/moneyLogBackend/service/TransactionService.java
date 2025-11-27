package com.mukesh.moneyLogBackend.service;


import com.mukesh.moneyLogBackend.Repository.CategoryRepo;
import com.mukesh.moneyLogBackend.Repository.TransactionRepo;
import com.mukesh.moneyLogBackend.Repository.WalletRepo;
import com.mukesh.moneyLogBackend.dto.TransactionRequestDto;
import com.mukesh.moneyLogBackend.model.Transaction;
import com.mukesh.moneyLogBackend.model.User;
import com.mukesh.moneyLogBackend.model.Wallet;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class TransactionService {

    private final WalletService walletService;
    private final UserService userService;
    private final WalletRepo walletRepo;
    private final TransactionRepo transactionRepo;
    private final CategoryRepo categoryRepo;


    public Transaction createTransaction(TransactionRequestDto transactionRequestDto, Long walletId) {
        User user = userService.getCurrentUser();
        Wallet wallet = walletRepo.findByWalletIdAndUser(walletId, user).orElseThrow();

        if(transactionRequestDto.getIsIncome()) wallet.setBalance(wallet.getBalance()  + transactionRequestDto.getAmount());
        else wallet.setBalance(wallet.getBalance() - transactionRequestDto.getAmount());

        walletRepo.save(wallet);

        Transaction transaction = Transaction
                .builder()
                .amount(transactionRequestDto.getAmount())
                .category(categoryRepo.findById(transactionRequestDto.getCategoryId()).orElseThrow())
                .description(transactionRequestDto.getDescription())
                .isIncome(transactionRequestDto.getIsIncome())
                .wallet(wallet)
                .transactionDate(LocalDateTime.now())
                .build();

        transaction = transactionRepo.save(transaction);
        return  transaction;
    }

    public List<Transaction> getAllTransactions() {
        User user = userService.getCurrentUser();

        return  transactionRepo.findUserTransactionsWithWalletAndCategory(user.getId());

    }
}
