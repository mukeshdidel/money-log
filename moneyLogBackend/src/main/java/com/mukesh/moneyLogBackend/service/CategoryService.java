package com.mukesh.moneyLogBackend.service;

import com.mukesh.moneyLogBackend.Repository.CategoryRepo;
import com.mukesh.moneyLogBackend.model.Category;
import com.mukesh.moneyLogBackend.model.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CategoryService {

    private CategoryRepo categoryRepo;
    private UserService userService;

    public List<Category> getCategories() {
        User user = userService.getCurrentUser();
        return categoryRepo.findByUserIdOrCreatedByUser(user.getId(), false);
    }
}
