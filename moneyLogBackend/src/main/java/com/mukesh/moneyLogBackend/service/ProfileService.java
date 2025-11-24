package com.mukesh.moneyLogBackend.service;


import com.mukesh.moneyLogBackend.Repository.ProfileRepo;
import com.mukesh.moneyLogBackend.dto.AuthDto;
import com.mukesh.moneyLogBackend.dto.ProfileDto;
import com.mukesh.moneyLogBackend.model.Profile;
import com.mukesh.moneyLogBackend.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfileService {
    private final ProfileRepo profileRepo;
    private final  EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;


    public ProfileDto registerProfile(ProfileDto profileDto){
        Profile newProfile = toEntity(profileDto);
        newProfile.setActivationToken(UUID.randomUUID().toString());
        newProfile.setPassword(passwordEncoder.encode(newProfile.getPassword()));
        newProfile = profileRepo.save(newProfile);

        // send activation link
        String activationLink = "http://localhost:8080/api/v1/activate?token=" + newProfile.getActivationToken();
        String subject = "Activate your money log account";
        String body = "click on the link to activate your account: " + activationLink;
        emailService.sendEmail(newProfile.getEmail(), subject, body);
        return toDto(newProfile);
    }


    public Profile toEntity(ProfileDto profileDto){
        return Profile
                .builder()
                .id(profileDto.getId())
                .email(profileDto.getEmail())
                .fullName(profileDto.getFullName())
                .password(profileDto.getPassword())
                .createdAt(profileDto.getCreatedAt())
                .updatedAt(profileDto.getUpdatedAt())
                .build();
    }


    public ProfileDto toDto(Profile profile){
        return ProfileDto
                .builder()
                .id(profile.getId())
                .email(profile.getEmail())
                .fullName(profile.getFullName())
                .createdAt(profile.getCreatedAt())
                .updatedAt(profile.getUpdatedAt())
                .build();
    }

    public boolean activateProfile(String activationToken){
        return profileRepo.findByActivationToken(activationToken).map(profile -> {
            profile.setIsActive(true);
            profileRepo.save(profile);
            return true;
        }).orElse(false);
    }

    public boolean isAccountActive(String email){
        return profileRepo
                .findByEmail(email)
                .map(Profile::getIsActive)
                .orElse(false);
    }

    public Profile getCurrentProfile(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return  profileRepo
                .findByEmail(authentication.getName())
                .orElseThrow(()->new UsernameNotFoundException("profile not found with this email"));
    }

    public ProfileDto getPublicProfile(String email) {
        Profile currentUser = null;
        if(email == null) {
            currentUser = getCurrentProfile();
        }
        else {
            currentUser = profileRepo
                    .findByEmail(email)
                    .orElseThrow(()->new UsernameNotFoundException("profile not found with this email"));
        }

        return ProfileDto
                .builder()
                .id(currentUser.getId())
                .email(currentUser.getEmail())
                .fullName(currentUser.getFullName())
                .createdAt(currentUser.getCreatedAt())
                .updatedAt(currentUser.getUpdatedAt())
                .build();
    }

    public Map<String, Object> login(AuthDto authDto) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authDto.getEmail(), authDto.getPassword()));
            Profile profile = profileRepo.findByEmail(authDto.getEmail()).orElseThrow();
            String token = jwtUtil.generateJwtToken(profile);
            return Map.of(
                    "token",  token,
                    "user", getPublicProfile(authDto.getEmail())
            );
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            throw new RuntimeException("invalid email or pass");
        }
    }
}
