package com.mukesh.moneyLogBackend.service;


import com.mukesh.moneyLogBackend.Repository.WalletRepo;
import com.mukesh.moneyLogBackend.dto.WalletGetResponseDto;
import com.mukesh.moneyLogBackend.dto.WalletPostRequestDto;
import com.mukesh.moneyLogBackend.dto.WalletPostResponseDto;
import com.mukesh.moneyLogBackend.dto.WalletWithTransResponseDto;
import com.mukesh.moneyLogBackend.model.User;
import com.mukesh.moneyLogBackend.model.Wallet;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class WalletService {
    private final WalletRepo walletRepo;
    private final UserService userService;

    public WalletPostResponseDto createWallet(WalletPostRequestDto walletPostRequestDto) {
        User user = userService.getCurrentUser();

        Wallet newWallet = Wallet
                .builder()
                .name(walletPostRequestDto.getName())
                .balance(walletPostRequestDto.getBalance())
                .description(walletPostRequestDto.getDescription())
                .currency(walletPostRequestDto.getCurrency())
                .user(user)
                .build();

        newWallet = walletRepo.save(newWallet);

        return WalletPostResponseDto
                .builder()
                .walletId(newWallet.getWalletId())
                .name(newWallet.getName())
                .balance(newWallet.getBalance())
                .description(newWallet.getDescription())
                .currency(newWallet.getCurrency())
                .createdAt(newWallet.getCreatedAt())
                .updatedAt(newWallet.getUpdatedAt())
                .build();

    }

    public List<WalletGetResponseDto> retrieveWalletsByUser() {
        User user = userService.getCurrentUser();
        List<Wallet> wallets = walletRepo.findByUser(user);

        return wallets.stream().map(wallet -> {
            return WalletGetResponseDto
                    .builder()
                    .walletId(wallet.getWalletId())
                    .name(wallet.getName())
                    .balance(wallet.getBalance())
                    .description(wallet.getDescription())
                    .currency(wallet.getCurrency())
                    .updatedAt(wallet.getUpdatedAt())
                    .build();
        }).toList();
    }


    public WalletWithTransResponseDto retrieveWalletById(Long id) {
        User user = userService.getCurrentUser();
        Wallet wallet = walletRepo.findByWalletIdAndUser(id, user).orElseThrow(()-> new EntityNotFoundException("cant find wallet with id: "+ id));

        return WalletWithTransResponseDto
                .builder()
                .walletId(wallet.getWalletId())
                .name(wallet.getName())
                .balance(wallet.getBalance())
                .currency(wallet.getCurrency())
                .description(wallet.getDescription())
                .updatedAt(wallet.getUpdatedAt())
                .transactions(wallet.getTransactions())
                .build();
    }
}
