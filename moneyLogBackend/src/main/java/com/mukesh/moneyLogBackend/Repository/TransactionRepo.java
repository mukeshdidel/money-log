package com.mukesh.moneyLogBackend.Repository;

import com.mukesh.moneyLogBackend.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepo extends JpaRepository<Transaction, Long> {
}
