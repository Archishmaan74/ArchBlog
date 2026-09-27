package com.archblog.archblog_backend.services;

import com.archblog.archblog_backend.exceptions.EmailSendingException;
import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.RETURNS_DEEP_STUBS;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

class EmailServiceTest {

    private Resend resend;
    private EmailService emailService;

    @BeforeEach
    void setUp() {
        resend = mock(Resend.class, RETURNS_DEEP_STUBS);
        emailService = new EmailService(resend, "test@archblog.com");
    }

    @Test
    void shouldSendOtpEmailSuccessfully() throws ResendException {
        emailService.sendOtpEmail("user@gmail.com", "123456");

        verify(resend.emails()).send(any(CreateEmailOptions.class));
    }

    @Test
    void shouldThrowExceptionWhenEmailSendingFails() throws ResendException {
        ResendException exception = new ResendException("Email sending failed");

        var emails = resend.emails();

        doThrow(exception)
                .when(emails)
                .send(any(CreateEmailOptions.class));

        assertThrows(
                EmailSendingException.class,
                () -> emailService.sendOtpEmail("user@gmail.com", "123456")
        );
    }
}