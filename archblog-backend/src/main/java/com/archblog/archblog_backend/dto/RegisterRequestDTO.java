package com.archblog.archblog_backend.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterRequestDTO {
    private String firstName;
    private String lastName;
    private String gender;
    private String companyName;
    private String email;
    private String password;
}