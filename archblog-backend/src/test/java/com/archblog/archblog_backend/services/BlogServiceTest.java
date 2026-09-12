package com.archblog.archblog_backend.services;

import com.archblog.archblog_backend.dto.BlogDTO;
import com.archblog.archblog_backend.entities.BlogEntity;
import com.archblog.archblog_backend.entities.UserEntity;
import com.archblog.archblog_backend.exceptions.LimitExceededException;
import com.archblog.archblog_backend.exceptions.ResourceNotFoundException;
import com.archblog.archblog_backend.repositories.BlogRepository;
import com.archblog.archblog_backend.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;

import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

class BlogServiceTest {

    @Mock
    private BlogRepository blogRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private BlogService blogService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void shouldGetAllBlogsSuccessfully() {

        when(blogRepository.findAllByOrderByDateOfBlogDescTimeOfBlogDesc())
                .thenReturn(Collections.emptyList());

        assertEquals(0, blogService.getAllBogs().size());
    }

    @Test
    void shouldCreateBlogSuccessfully() {

        BlogDTO blog = new BlogDTO();
        blog.setTitle("Test Blog");
        blog.setContent("Test Content");
        blog.setUserEmail("test@gmail.com");

        UserEntity user = new UserEntity();

        BlogEntity savedBlog = new BlogEntity();
        savedBlog.setBlogTitle("Test Blog");
        savedBlog.setBlogContent("Test Content");
        savedBlog.setUser(user);

        when(blogRepository.count()).thenReturn(0L);
        when(userRepository.findByEmail("test@gmail.com")).thenReturn(Optional.of(user));
        when(blogRepository.save(org.mockito.ArgumentMatchers.any(BlogEntity.class)))
                .thenReturn(savedBlog);

        BlogDTO result = blogService.createBlog(blog);

        assertEquals("Test Blog", result.getTitle());
    }

    @Test
    void shouldThrowExceptionWhenBlogLimitIsReached() {

        BlogDTO blog = new BlogDTO();

        when(blogRepository.count()).thenReturn(500L);

        assertThrows(
                LimitExceededException.class,
                () -> blogService.createBlog(blog)
        );
    }

    @Test
    void shouldThrowExceptionWhenCreatingBlogWithUnknownUser() {

        BlogDTO blog = new BlogDTO();
        blog.setUserEmail("test@gmail.com");

        when(blogRepository.count()).thenReturn(0L);
        when(userRepository.findByEmail("test@gmail.com"))
                .thenReturn(Optional.empty());

        assertThrows(
                ResourceNotFoundException.class,
                () -> blogService.createBlog(blog)
        );
    }

    @Test
    void shouldDeleteBlogSuccessfully() {

        when(blogRepository.existsById(1L)).thenReturn(true);

        String result = blogService.deleteBlog(1L);

        assertEquals("Blog details deleted!", result);
    }

    @Test
    void shouldThrowExceptionWhenDeletingUnknownBlog() {

        when(blogRepository.existsById(1L)).thenReturn(false);

        assertThrows(
                ResourceNotFoundException.class,
                () -> blogService.deleteBlog(1L)
        );
    }

    @Test
    void shouldThrowExceptionWhenEditingUnknownBlog() {

        BlogDTO blog = new BlogDTO();

        when(blogRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(
                ResourceNotFoundException.class,
                () -> blogService.editBlog(blog, 1L)
        );
    }
}