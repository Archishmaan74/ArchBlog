package com.archblog.archblog_backend.services;

import com.archblog.archblog_backend.exceptions.EmailSendingException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;

class EmailServiceTest {

    @Mock
    private JavaMailSender mailSender;

    private EmailService emailService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        emailService = new EmailService(mailSender);
        ReflectionTestUtils.setField(emailService, "from", "test@archblog.com");
    }

    @Test
    void shouldSendOtpEmailSuccessfully() {

        emailService.sendOtpEmail("user@gmail.com", "123456");

        verify(mailSender).send(any(SimpleMailMessage.class));
    }

    @Test
    void shouldThrowExceptionWhenEmailSendingFails() {

        doThrow(new RuntimeException())
                .when(mailSender)
                .send(any(SimpleMailMessage.class));

        assertThrows(
                EmailSendingException.class,
                () -> emailService.sendOtpEmail("user@gmail.com", "123456")
        );
    }
}