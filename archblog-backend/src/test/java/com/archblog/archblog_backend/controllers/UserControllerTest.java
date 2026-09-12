package com.archblog.archblog_backend.controllers;

import com.archblog.archblog_backend.dto.JwtResponse;
import com.archblog.archblog_backend.dto.LoginDTO;
import com.archblog.archblog_backend.dto.RegisterRequestDTO;
import com.archblog.archblog_backend.dto.UserDTO;
import com.archblog.archblog_backend.services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders
                .standaloneSetup(userController)
                .build();
        objectMapper = new ObjectMapper();
    }

    @Test
    void shouldRegisterUserSuccessfully() throws Exception {

        RegisterRequestDTO request = new RegisterRequestDTO();
        request.setFirstName("John");
        request.setLastName("Doe");
        request.setEmail("john@gmail.com");
        request.setPassword("password");

        UserDTO user = new UserDTO();
        user.setEmail("john@gmail.com");

        when(userService.register(any(UserDTO.class), any(String.class)))
                .thenReturn(user);

        mockMvc.perform(post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("SUCCESS"))
                .andExpect(jsonPath("$.message").value("User registered successfully"))
                .andExpect(jsonPath("$.data.email").value("john@gmail.com"));
    }

    @Test
    void shouldLoginSuccessfully() throws Exception {

        LoginDTO request = new LoginDTO();
        request.setEmail("john@gmail.com");
        request.setPassword("password");

        UserDTO user = new UserDTO();
        user.setEmail("john@gmail.com");

        JwtResponse jwtResponse = new JwtResponse(
                "test-token",
                user
        );

        when(userService.login(any(LoginDTO.class)))
                .thenReturn(jwtResponse);

        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("SUCCESS"))
                .andExpect(jsonPath("$.message").value("Login successful"))
                .andExpect(jsonPath("$.data.token").value("test-token"));
    }

    @Test
    void shouldGetProfileSuccessfully() throws Exception {

        UserDTO user = new UserDTO();
        user.setEmail("john@gmail.com");

        Authentication authentication = mock(Authentication.class);

        when(authentication.getName()).thenReturn("john@gmail.com");
        when(userService.getProfile("john@gmail.com"))
                .thenReturn(user);

        mockMvc.perform(get("/auth/profile")
                        .principal(authentication))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("SUCCESS"))
                .andExpect(jsonPath("$.message").value("Profile fetched successfully"))
                .andExpect(jsonPath("$.data.email").value("john@gmail.com"));
    }

    @Test
    void shouldSendOtpSuccessfully() throws Exception {

        String email = "john@gmail.com";

        when(userService.sendOtpToEmail(email))
                .thenReturn("OTP sent to " + email);

        mockMvc.perform(post("/auth/forgot-password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                        {
                            "email": "john@gmail.com"
                        }
                        """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("SUCCESS"))
                .andExpect(jsonPath("$.data").value("OTP sent to john@gmail.com"));
    }

    @Test
    void shouldResetPasswordSuccessfully() throws Exception {

        when(userService.resetPasswordWithOtp(any()))
                .thenReturn("Password reset successfully.");

        mockMvc.perform(post("/auth/reset-password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                        {
                            "otp": "123456",
                            "newPassword": "newPassword"
                        }
                        """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("SUCCESS"))
                .andExpect(jsonPath("$.data").value("Password reset successfully."));
    }

    @Test
    void shouldRejectInvalidRegistrationRequest() throws Exception {

        RegisterRequestDTO request = new RegisterRequestDTO();
        request.setFirstName("");
        request.setLastName("");
        request.setEmail("invalid-email");
        request.setPassword("");

        mockMvc.perform(post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }
}