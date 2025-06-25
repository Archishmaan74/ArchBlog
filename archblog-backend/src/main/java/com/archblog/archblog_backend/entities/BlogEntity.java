package com.archblog.archblog_backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "blog")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BlogEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private LocalDate dateOfBlog;
    private LocalTime timeOfBlog;
    private String gender;
    private String companyName;
}
