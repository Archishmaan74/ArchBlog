package com.archblog.archblog_backend.services;

import com.archblog.archblog_backend.configuration.JwtUtil;
import com.archblog.archblog_backend.dto.*;
import com.archblog.archblog_backend.entities.UserEntity;
import com.archblog.archblog_backend.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;

    private final Map<String, String> otpStorage = new HashMap<>();
    private final Random random = new Random();

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       ModelMapper modelMapper,
                       JwtUtil jwtUtil,
                       AuthenticationManager authenticationManager,
                       EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.modelMapper = modelMapper;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
        this.emailService = emailService;
    }

    public UserDTO register(UserDTO userDTO, String password) {
        if (userRepository.count() >= 200) {
            throw new RuntimeException("Cannot register more than 200 users!");
        }

        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new RuntimeException("User already exists with email: " + userDTO.getEmail());
        }

        UserEntity user = modelMapper.map(userDTO, UserEntity.class);
        user.setPassword(passwordEncoder.encode(password));
        UserEntity savedUser = userRepository.save(user);
        return modelMapper.map(savedUser, UserDTO.class);
    }

    public JwtResponse login(LoginDTO loginDTO) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword())
        );

        UserEntity user = userRepository.findByEmail(loginDTO.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtUtil.generateToken(user.getEmail());
        UserDTO userDTO = modelMapper.map(user, UserDTO.class);
        return new JwtResponse(token, userDTO);
    }

    public UserDTO getProfile(String email) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return modelMapper.map(user, UserDTO.class);
    }

    public ResponseEntity<String> sendOtpToEmail(String email) {
        String otp = String.format("%06d", random.nextInt(1000000));
        otpStorage.put(email, otp);
        emailService.sendOtpEmail(email, otp);
        return ResponseEntity.ok("OTP sent to " + email);
    }

    public ResponseEntity<String> resetPasswordWithOtp(ResetPasswordRequestDTO request) {
        String email = otpStorage.entrySet().stream()
                .filter(entry -> entry.getValue().equals(request.getOtp()))
                .map(Map.Entry::getKey)
                .findFirst()
                .orElse(null);

        if (email == null) {
            return ResponseEntity.badRequest().body("Invalid or expired OTP.");
        }

        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
        otpStorage.remove(email);

        return ResponseEntity.ok("Password reset successfully.");
    }
}