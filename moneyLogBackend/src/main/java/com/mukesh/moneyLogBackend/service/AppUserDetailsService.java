package com.mukesh.moneyLogBackend.service;

import com.mukesh.moneyLogBackend.Repository.ProfileRepo;
import com.mukesh.moneyLogBackend.model.Profile;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;


@Service
@RequiredArgsConstructor
public class AppUserDetailsService implements UserDetailsService {

    private final ProfileRepo profileRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Profile existingProfile = profileRepo
                .findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("email not found"));

        return User
                .builder()
                .username(existingProfile.getEmail())
                .password(existingProfile.getPassword())
                .authorities(Collections.emptyList())
                .build();

    }
}
