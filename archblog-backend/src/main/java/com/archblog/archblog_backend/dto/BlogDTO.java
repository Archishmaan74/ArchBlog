package com.archblog.archblog_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BlogDTO{
    private Long id;
    private String firstName;
    private String lastName;
    private String title;
    private String content;
    private LocalDate dateOfBlog;
    private LocalTime timeOfBlog;
    private String gender;
    private String companyName;
}
