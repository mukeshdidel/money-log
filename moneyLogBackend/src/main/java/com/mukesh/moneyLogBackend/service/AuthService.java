package com.mukesh.moneyLogBackend.service;


import com.mukesh.moneyLogBackend.Repository.UserRepo;
import com.mukesh.moneyLogBackend.dto.*;
import com.mukesh.moneyLogBackend.exceptions.AccountNotActivatedException;
import com.mukesh.moneyLogBackend.exceptions.EmailAlreadyRegisteredException;
import com.mukesh.moneyLogBackend.exceptions.InvalidCredentialsException;
import com.mukesh.moneyLogBackend.exceptions.UsernameAlreadyTakenException;
import com.mukesh.moneyLogBackend.model.User;
import com.mukesh.moneyLogBackend.utils.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class AuthService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepo userRepo;
    private final EmailService emailService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserService userService;


    public SignupResponseDto registerUser(SignupRequestDto signupRequestDto){

        Optional<User> existingUser = userRepo.findByUsernameOrEmail(signupRequestDto.getUsername(), signupRequestDto.getEmail());



        if(existingUser.isPresent()) {
            if(existingUser.get().getUsername().equals(signupRequestDto.getUsername())) {
                throw new UsernameAlreadyTakenException(signupRequestDto.getUsername());
            }
            if(existingUser.get().getEmail().equals(signupRequestDto.getEmail())) {
                throw new EmailAlreadyRegisteredException(signupRequestDto.getEmail());
            }
        }

        User newUser = User
                .builder()
                .email(signupRequestDto.getEmail())
                .username(signupRequestDto.getUsername())
                .fullName(signupRequestDto.getFullName())
                .password(signupRequestDto.getPassword())
                .build();

        newUser.setActivationToken(UUID.randomUUID().toString());
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        newUser = userRepo.save(newUser);

        // send activation link
        String activationLink = "http://localhost:8080/api/v1/auth/activate?token=" + newUser.getActivationToken();
        String subject = "Activate your money log account";
        String body = "click on the link to activate your account: " + activationLink;
        emailService.sendEmail(newUser.getEmail(), subject, body);
        return SignupResponseDto
                .builder()
                .id(newUser.getId())
                .email(newUser.getEmail())
                .username(newUser.getUsername())
                .fullName(newUser.getFullName())
                .build();
    }

    public boolean activateProfile(String activationToken){
        return userRepo.findByActivationToken(activationToken).map(profile -> {
            profile.setIsActive(true);
            userRepo.save(profile);
            return true;
        }).orElse(false);
    }

    public boolean isAccountActive(String email){
        return userRepo
                .findByEmail(email)
                .map(User::getIsActive)
                .orElse(false);
    }


    public LoginResponseDto login(LoginRequestDto loginRequestDto) {
        Authentication authentication = null;
        try {
            authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequestDto.getEmail(), loginRequestDto.getPassword()));
        } catch (Exception ex) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        if (!isAccountActive(loginRequestDto.getEmail())){
            throw new AccountNotActivatedException();
        }

        User user = (User) authentication.getPrincipal();
        if (user == null) throw new AssertionError();
        String token = jwtUtil.generateJwtToken(user);
        return LoginResponseDto
                .builder()
                .token(token)
                .build();

    }


}
