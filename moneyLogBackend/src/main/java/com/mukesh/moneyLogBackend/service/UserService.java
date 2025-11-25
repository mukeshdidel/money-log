package com.mukesh.moneyLogBackend.service;


import com.mukesh.moneyLogBackend.Repository.UserRepo;
import com.mukesh.moneyLogBackend.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepo userRepo;
    private final  EmailService emailService;

    public User getCurrentUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        return  userRepo
                .findByUsername(authentication.getName())
                .orElseThrow(()->new UsernameNotFoundException("profile not found with username: "+authentication.getName()));
    }

}
