package com.archblog.archblog_backend.controllers;

import com.archblog.archblog_backend.dto.EmailRequestDTO;
import com.archblog.archblog_backend.dto.JwtResponse;
import com.archblog.archblog_backend.dto.LoginDTO;
import com.archblog.archblog_backend.dto.ResetPasswordRequestDTO;
import com.archblog.archblog_backend.dto.UserDTO;
import com.archblog.archblog_backend.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@RequestBody UserDTO userDTO,
                                                @RequestParam String password) {
        UserDTO registeredUser = userService.register(userDTO, password);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> loginUser(@RequestBody LoginDTO loginDTO) {
        JwtResponse jwtResponse = userService.login(loginDTO);
        return ResponseEntity.ok(jwtResponse);
    }

    @GetMapping("/profile")
    public ResponseEntity<UserDTO> getLoggedInUser(Authentication authentication) {
        String email = authentication.getName();
        UserDTO userDTO = userService.getProfile(email);
        return ResponseEntity.ok(userDTO);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> sendOtp(@RequestBody EmailRequestDTO request) {
        return userService.sendOtpToEmail(request.getEmail());
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequestDTO request) {
        return userService.resetPasswordWithOtp(request);
    }
}