package com.archblog.archblog_backend.services;

import com.archblog.archblog_backend.configuration.JwtUtil;
import com.archblog.archblog_backend.dto.*;
import com.archblog.archblog_backend.entities.UserEntity;
import com.archblog.archblog_backend.exceptions.*;
import com.archblog.archblog_backend.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private ModelMapper modelMapper;

    @Mock
    private JwtUtil jwtUtil;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void shouldRegisterUserSuccessfully() {

        UserDTO user = new UserDTO();
        user.setEmail("test@gmail.com");

        UserEntity userEntity = new UserEntity();
        UserEntity savedUser = new UserEntity();

        UserDTO resultUser = new UserDTO();
        resultUser.setEmail("test@gmail.com");

        when(userRepository.count()).thenReturn(0L);
        when(userRepository.existsByEmail(user.getEmail())).thenReturn(false);
        when(modelMapper.map(user, UserEntity.class)).thenReturn(userEntity);
        when(passwordEncoder.encode("password")).thenReturn("encodedPassword");
        when(userRepository.save(userEntity)).thenReturn(savedUser);
        when(modelMapper.map(savedUser, UserDTO.class)).thenReturn(resultUser);

        UserDTO result = userService.register(user, "password");

        assertEquals("test@gmail.com", result.getEmail());
    }

    @Test
    void shouldThrowExceptionWhenEmailAlreadyExists() {

        UserDTO user = new UserDTO();
        user.setEmail("test@gmail.com");

        when(userRepository.count()).thenReturn(0L);
        when(userRepository.existsByEmail(user.getEmail())).thenReturn(true);

        assertThrows(
                DuplicateResourceException.class,
                () -> userService.register(user, "password")
        );
    }

    @Test
    void shouldThrowExceptionWhenUserLimitIsReached() {

        UserDTO user = new UserDTO();
        user.setEmail("test@gmail.com");

        when(userRepository.count()).thenReturn(200L);

        assertThrows(
                LimitExceededException.class,
                () -> userService.register(user, "password")
        );
    }

    @Test
    void shouldLoginSuccessfully() {

        LoginDTO login = new LoginDTO();
        login.setEmail("test@gmail.com");
        login.setPassword("password");

        UserEntity user = new UserEntity();
        user.setEmail("test@gmail.com");

        UserDTO userDTO = new UserDTO();
        userDTO.setEmail("test@gmail.com");

        when(userRepository.findByEmail(login.getEmail())).thenReturn(Optional.of(user));
        when(jwtUtil.generateToken(user.getEmail())).thenReturn("token");
        when(modelMapper.map(user, UserDTO.class)).thenReturn(userDTO);

        JwtResponse result = userService.login(login);

        assertEquals("token", result.getToken());
    }

    @Test
    void shouldThrowExceptionWhenLoginUserIsNotFound() {

        LoginDTO login = new LoginDTO();
        login.setEmail("test@gmail.com");
        login.setPassword("password");

        when(userRepository.findByEmail(login.getEmail())).thenReturn(Optional.empty());

        assertThrows(
                ResourceNotFoundException.class,
                () -> userService.login(login)
        );
    }

    @Test
    void shouldGetProfileSuccessfully() {

        UserEntity user = new UserEntity();
        user.setEmail("test@gmail.com");

        UserDTO userDTO = new UserDTO();
        userDTO.setEmail("test@gmail.com");

        when(userRepository.findByEmail("test@gmail.com")).thenReturn(Optional.of(user));
        when(modelMapper.map(user, UserDTO.class)).thenReturn(userDTO);

        UserDTO result = userService.getProfile("test@gmail.com");

        assertEquals("test@gmail.com", result.getEmail());
    }

    @Test
    void shouldThrowExceptionWhenProfileUserIsNotFound() {

        when(userRepository.findByEmail("test@gmail.com")).thenReturn(Optional.empty());

        assertThrows(
                ResourceNotFoundException.class,
                () -> userService.getProfile("test@gmail.com")
        );
    }

    @Test
    void shouldThrowExceptionWhenOtpIsInvalid() {

        ResetPasswordRequestDTO request = new ResetPasswordRequestDTO();
        request.setOtp("123456");
        request.setNewPassword("newPassword");

        assertThrows(
                InvalidOtpException.class,
                () -> userService.resetPasswordWithOtp(request)
        );
    }
}