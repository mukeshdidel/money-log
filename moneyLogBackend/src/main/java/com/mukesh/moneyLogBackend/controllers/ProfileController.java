package com.mukesh.moneyLogBackend.controllers;


import com.mukesh.moneyLogBackend.dto.AuthDto;
import com.mukesh.moneyLogBackend.dto.ProfileDto;
import com.mukesh.moneyLogBackend.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class ProfileController {

    private  final ProfileService profileService;

    @PostMapping("/register")
    public ResponseEntity<ProfileDto> registerProfile(@RequestBody ProfileDto profileDto){
        ProfileDto registeredProfile = profileService.registerProfile(profileDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(registeredProfile);
    }


    @GetMapping("/activate")
    public ResponseEntity<String> activateProfile(@RequestParam String token) {

        boolean isActivated = profileService.activateProfile(token);
        if(isActivated){
            return ResponseEntity.ok("your profile is activated");
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("token not found or already used");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody AuthDto authDto){
        try{
            if (!profileService.isAccountActive(authDto.getEmail())){
                 return ResponseEntity
                         .status(HttpStatus.FORBIDDEN)
                         .body(Map.of(
                                 "message", "the account is not active please activate the account first "
                         ));
            }
            Map<String, Object> res = profileService.login(authDto);
            return ResponseEntity.ok(res);
        }catch (Exception ex){
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", ex.getMessage()));
        }
    }

    @GetMapping("/test")
    public ResponseEntity<String> test(){
        return ResponseEntity.ok("test ok");
    }
}
