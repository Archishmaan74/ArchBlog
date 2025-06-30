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
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String blogTitle;

    @Lob
    private String blogContent;

    private LocalDate dateOfBlog;
    private LocalTime timeOfBlog;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;
}
