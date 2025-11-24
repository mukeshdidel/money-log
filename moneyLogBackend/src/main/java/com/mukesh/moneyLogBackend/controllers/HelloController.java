package com.mukesh.moneyLogBackend.controllers;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({"/status", "/health"})
public class HelloController {

    @GetMapping
    public String health(){
        return "ok";
    }
}
