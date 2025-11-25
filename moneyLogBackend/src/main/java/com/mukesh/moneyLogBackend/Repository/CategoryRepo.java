package com.mukesh.moneyLogBackend.Repository;

import com.mukesh.moneyLogBackend.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepo extends JpaRepository<Category, Long> {
}
