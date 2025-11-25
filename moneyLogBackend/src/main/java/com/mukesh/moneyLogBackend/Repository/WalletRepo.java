package com.mukesh.moneyLogBackend.Repository;

import com.mukesh.moneyLogBackend.dto.WalletGetResponseDto;
import com.mukesh.moneyLogBackend.model.User;
import com.mukesh.moneyLogBackend.model.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WalletRepo extends JpaRepository<Wallet , Long> {

    List<Wallet> findByUser(User user);

}
