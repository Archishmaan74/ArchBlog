package com.archblog.archblog_backend.controllers;

import com.archblog.archblog_backend.configuration.JwtUtil;
import com.archblog.archblog_backend.dto.BlogDTO;
import com.archblog.archblog_backend.services.BlogService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class BlogControllerTest {

    @Mock
    private BlogService blogService;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private BlogController blogController;

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders
                .standaloneSetup(blogController)
                .build();
        objectMapper = new ObjectMapper();
    }

    @Test
    void shouldGetAllBlogsSuccessfully() throws Exception {

        when(blogService.getAllBogs())
                .thenReturn(Collections.emptyList());

        mockMvc.perform(get("/blogs"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("SUCCESS"))
                .andExpect(jsonPath("$.message").value("Blogs fetched successfully"))
                .andExpect(jsonPath("$.data").isEmpty());
    }

    @Test
    void shouldGetMyBlogsSuccessfully() throws Exception {

        when(jwtUtil.extractUsername("test-token"))
                .thenReturn("john@gmail.com");

        when(blogService.getBlogsByEmail("john@gmail.com"))
                .thenReturn(Collections.emptyList());

        mockMvc.perform(get("/blogs/myblogs")
                        .header("Authorization", "Bearer test-token"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("SUCCESS"))
                .andExpect(jsonPath("$.message").value("My blogs fetched successfully"))
                .andExpect(jsonPath("$.data").isEmpty());
    }

    @Test
    void shouldCreateBlogSuccessfully() throws Exception {

        BlogDTO blog = new BlogDTO();
        blog.setTitle("Test Blog");
        blog.setContent("Test Content");

        BlogDTO createdBlog = new BlogDTO();
        createdBlog.setTitle("Test Blog");
        createdBlog.setContent("Test Content");

        when(jwtUtil.extractUsername("test-token"))
                .thenReturn("john@gmail.com");

        when(blogService.createBlog(any(BlogDTO.class)))
                .thenReturn(createdBlog);

        mockMvc.perform(post("/blogs")
                        .header("Authorization", "Bearer test-token")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(blog)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("SUCCESS"))
                .andExpect(jsonPath("$.message").value("Blog created successfully"))
                .andExpect(jsonPath("$.data.title").value("Test Blog"));
    }

    @Test
    void shouldDeleteBlogSuccessfully() throws Exception {

        when(blogService.deleteBlog(1L))
                .thenReturn("Blog details deleted!");

        mockMvc.perform(delete("/blogs/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("SUCCESS"))
                .andExpect(jsonPath("$.message").value("Blog deleted successfully"))
                .andExpect(jsonPath("$.data").value("Blog details deleted!"));
    }

    @Test
    void shouldEditBlogSuccessfully() throws Exception {

        BlogDTO blog = new BlogDTO();
        blog.setTitle("Updated Blog");
        blog.setContent("Updated Content");

        BlogDTO updatedBlog = new BlogDTO();
        updatedBlog.setTitle("Updated Blog");
        updatedBlog.setContent("Updated Content");

        when(blogService.editBlog(any(BlogDTO.class), anyLong()))
                .thenReturn(updatedBlog);

        mockMvc.perform(put("/blogs/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(blog)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("SUCCESS"))
                .andExpect(jsonPath("$.message").value("Blog updated successfully"))
                .andExpect(jsonPath("$.data.title").value("Updated Blog"));
    }
}