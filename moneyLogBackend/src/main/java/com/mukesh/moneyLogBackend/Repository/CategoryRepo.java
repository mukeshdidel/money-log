package com.mukesh.moneyLogBackend.Repository;

import com.mukesh.moneyLogBackend.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepo extends JpaRepository<Category, Long> {
    public List<Category> findByUserIdOrCreatedByUser(Long userId, Boolean createdByUser);
}

