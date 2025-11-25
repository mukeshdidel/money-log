package com.mukesh.moneyLogBackend.security;

import com.mukesh.moneyLogBackend.Repository.UserRepo;
import com.mukesh.moneyLogBackend.service.AppUserDetailsService;
import com.mukesh.moneyLogBackend.utils.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@AllArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private UserRepo userRepo;
    private JwtUtil jwtUtil;
    private AppUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
         String reqTokenHeader = request.getHeader("Authorization");
         if (reqTokenHeader == null || !reqTokenHeader.startsWith("Bearer")) {
             filterChain.doFilter(request, response);
             return;
         }

         String token = reqTokenHeader.split(" ")[1];
         String email = jwtUtil.getEmailFromToken(token);

         if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
             UserDetails userDetails = userDetailsService.loadUserByUsername(email);
             UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
             usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
             SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
         }

         filterChain.doFilter(request, response);

    }

}
