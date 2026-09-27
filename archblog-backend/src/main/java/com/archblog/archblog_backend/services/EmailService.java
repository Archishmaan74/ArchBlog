package com.archblog.archblog_backend.services;

import com.archblog.archblog_backend.exceptions.EmailSendingException;
import com.resend.Resend;
import com.resend.services.emails.model.CreateEmailOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final Resend resend;
    private final String from;

    @Autowired
    public EmailService(
            @Value("${resend.api-key}") String apiKey,
            @Value("${resend.from-email}") String from) {
        this.resend = new Resend(apiKey);
        this.from = from;
    }

    EmailService(Resend resend, String from) {
        this.resend = resend;
        this.from = from;
    }

    public void sendOtpEmail(String to, String otp) {
        CreateEmailOptions email = CreateEmailOptions.builder()
                .from(from)
                .to(to)
                .subject("Your ArchBlog OTP Code")
                .text(
                        "Your OTP for resetting your ArchBlog password is: "
                                + otp
                                + "\n\nThis OTP is valid for one use only."
                )
                .build();

        try {
            resend.emails().send(email);
        } catch (Exception exception) {
            throw new EmailSendingException("Failed to send OTP email");
        }
    }
}