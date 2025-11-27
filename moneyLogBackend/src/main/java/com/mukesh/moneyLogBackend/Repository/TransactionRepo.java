package com.mukesh.moneyLogBackend.Repository;

import com.mukesh.moneyLogBackend.model.Transaction;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TransactionRepo extends JpaRepository<Transaction, Long> {
    @Query("""
        SELECT t, w FROM Transaction t
        JOIN wallet w
        JOIN category c
        WHERE w.user.id = :userId
        ORDER BY t.transactionDate DESC
    """)
    List<Transaction> findUserTransactionsWithWalletAndCategory(Long userId);

}
