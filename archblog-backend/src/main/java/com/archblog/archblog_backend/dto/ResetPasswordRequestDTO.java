package com.archblog.archblog_backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResetPasswordRequestDTO {

    @NotBlank(message = "OTP is required")
    private String otp;

    @NotBlank(message = "New password is required")
    private String newPassword;
}