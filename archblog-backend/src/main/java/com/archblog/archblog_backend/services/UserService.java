package com.archblog.archblog_backend.services;

import com.archblog.archblog_backend.configuration.JwtUtil;
import com.archblog.archblog_backend.dto.JwtResponse;
import com.archblog.archblog_backend.dto.LoginDTO;
import com.archblog.archblog_backend.dto.UserDTO;
import com.archblog.archblog_backend.entities.UserEntity;
import com.archblog.archblog_backend.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       ModelMapper modelMapper,
                       JwtUtil jwtUtil,
                       AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.modelMapper = modelMapper;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
    }

    public UserDTO register(UserDTO userDTO, String password) {
        UserEntity user = modelMapper.map(userDTO, UserEntity.class);
        user.setPassword(passwordEncoder.encode(password));
        UserEntity savedUser = userRepository.save(user);
        return modelMapper.map(savedUser, UserDTO.class);
    }

    public JwtResponse login(LoginDTO loginDTO) {
        // Authenticate with Spring Security
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
}
