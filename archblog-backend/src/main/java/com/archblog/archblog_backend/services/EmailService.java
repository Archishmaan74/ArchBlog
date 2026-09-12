package com.archblog.archblog_backend.services;

import com.archblog.archblog_backend.exceptions.EmailSendingException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String from;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendOtpEmail(String to, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(to);
        message.setSubject("Your ArchBlog OTP Code");
        message.setText("Your OTP for resetting your ArchBlog password is: " + otp + "\n\nThis OTP is valid for one use only.");

        try {
            mailSender.send(message);
        } catch (Exception exception) {
            throw new EmailSendingException("Failed to send OTP email");
        }
    }
}