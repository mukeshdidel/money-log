package com.mukesh.moneyLogBackend.controllers;


import com.mukesh.moneyLogBackend.dto.*;
import com.mukesh.moneyLogBackend.exceptions.AccountNotActivatedException;
import com.mukesh.moneyLogBackend.service.AuthService;
import com.mukesh.moneyLogBackend.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<SignupResponseDto> registerProfile(@Valid @RequestBody SignupRequestDto signupRequestDto){
        SignupResponseDto registeredUser = authService.registerUser(signupRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(registeredUser);
    }


    @GetMapping("/activate")
    public ResponseEntity<String> activateProfile(@Valid @RequestParam String token) {

        boolean isActivated = authService.activateProfile(token);
        if(isActivated){
            return ResponseEntity.ok("your profile is activated");
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("token not found or already used");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto loginRequestDto){
        LoginResponseDto res = authService.login(loginRequestDto);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }
}
