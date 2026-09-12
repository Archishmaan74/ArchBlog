package com.archblog.archblog_backend.controllers;

import com.archblog.archblog_backend.dto.*;
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
    public ResponseEntity<ApiResponse<UserDTO>> registerUser(
            @RequestBody RegisterRequestDTO request) {

        UserDTO userDTO = UserDTO.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .gender(request.getGender())
                .companyName(request.getCompanyName())
                .email(request.getEmail())
                .build();

        UserDTO registeredUser =
                userService.register(userDTO, request.getPassword());

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "SUCCESS",
                        "User registered successfully",
                        registeredUser
                )
        );
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<JwtResponse>> loginUser(
            @RequestBody LoginDTO loginDTO) {

        JwtResponse jwtResponse = userService.login(loginDTO);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "SUCCESS",
                        "Login successful",
                        jwtResponse
                )
        );
    }

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<UserDTO>> getLoggedInUser(
            Authentication authentication) {

        String email = authentication.getName();
        UserDTO userDTO = userService.getProfile(email);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "SUCCESS",
                        "Profile fetched successfully",
                        userDTO
                )
        );
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<String>> sendOtp(
            @RequestBody EmailRequestDTO request) {

        ResponseEntity<String> response =
                userService.sendOtpToEmail(request.getEmail());

        return ResponseEntity
                .status(response.getStatusCode())
                .body(
                        new ApiResponse<>(
                                "SUCCESS",
                                response.getBody(),
                                response.getBody()
                        )
                );
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<String>> resetPassword(
            @RequestBody ResetPasswordRequestDTO request) {

        ResponseEntity<String> response =
                userService.resetPasswordWithOtp(request);

        return ResponseEntity
                .status(response.getStatusCode())
                .body(
                        new ApiResponse<>(
                                "SUCCESS",
                                response.getBody(),
                                response.getBody()
                        )
                );
    }
}