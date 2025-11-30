package com.mukesh.moneyLogBackend.Repository;

import com.mukesh.moneyLogBackend.dto.TransactionGetResponseDto;
import com.mukesh.moneyLogBackend.dto.TransactionListDto;
import com.mukesh.moneyLogBackend.model.Transaction;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TransactionRepo extends JpaRepository<Transaction, Long> {
    @Query("""
    SELECT new com.mukesh.moneyLogBackend.dto.TransactionListDto(
            t.transactionId,
            t.amount,
            t.isIncome,
            t.transactionDate,
            t.description,
            w.walletId,
            w.name,
            w.currency,
            c.categoryId,
            c.name
        )
        FROM Transaction t
        JOIN t.wallet w
        JOIN t.category c
        WHERE w.user.id = :userId
        ORDER BY t.transactionDate DESC
    """)
    List<TransactionListDto> findAllUserTransactions(Long userId);

}
