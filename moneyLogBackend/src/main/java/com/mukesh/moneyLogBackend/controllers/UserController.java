package com.mukesh.moneyLogBackend.controllers;


import com.mukesh.moneyLogBackend.Repository.UserRepo;
import com.mukesh.moneyLogBackend.dto.ProfileResponseDto;
import com.mukesh.moneyLogBackend.model.User;
import com.mukesh.moneyLogBackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class UserController {

//    private final UserRepo userRepo;

    private final UserService userService;

    @GetMapping("/test")
    public ResponseEntity<String> test(){
        return ResponseEntity.ok("test ok");
    }

//    @GetMapping("/users")
//    public List<User> getAllUSers(){
//        return userRepo.findAll();
//    }

    @GetMapping("/profile")
    public ResponseEntity<ProfileResponseDto> getProfile() {
        return ResponseEntity.ok(userService.getUserProfile());
    }
}
