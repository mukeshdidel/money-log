package com.mukesh.moneyLogBackend.controllers;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class UserController {



    @GetMapping("/test")
    public ResponseEntity<String> test(){
        return ResponseEntity.ok("test ok");
    }
}
