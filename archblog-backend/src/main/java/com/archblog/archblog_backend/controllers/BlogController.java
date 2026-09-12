package com.archblog.archblog_backend.controllers;

import com.archblog.archblog_backend.configuration.JwtUtil;
import com.archblog.archblog_backend.dto.ApiResponse;
import com.archblog.archblog_backend.dto.BlogDTO;
import com.archblog.archblog_backend.services.BlogService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/blogs")
public class BlogController {

    private final BlogService blogService;
    private final JwtUtil jwtUtil;

    private BlogController(BlogService blogService, JwtUtil jwtUtil) {
        this.blogService = blogService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping
    public ApiResponse<List<BlogDTO>> getAllBlogs() {
        return new ApiResponse<>(
                "SUCCESS",
                "Blogs fetched successfully",
                blogService.getAllBogs()
        );
    }

    @GetMapping("/myblogs")
    public ApiResponse<List<BlogDTO>> getMyBlogs(
            @RequestHeader("Authorization") String token) {

        String jwt = token.substring(7);
        String email = jwtUtil.extractUsername(jwt);

        return new ApiResponse<>(
                "SUCCESS",
                "My blogs fetched successfully",
                blogService.getBlogsByEmail(email)
        );
    }

    @PostMapping
    public ApiResponse<BlogDTO> createBlog(
            @RequestBody BlogDTO blogDTO,
            @RequestHeader("Authorization") String token) {

        String jwt = token.substring(7);
        String email = jwtUtil.extractUsername(jwt);

        blogDTO.setUserEmail(email);

        return new ApiResponse<>(
                "SUCCESS",
                "Blog created successfully",
                blogService.createBlog(blogDTO)
        );
    }

    @DeleteMapping(path = "/{id}")
    public ApiResponse<String> deleteBlog(@PathVariable Long id) {

        return new ApiResponse<>(
                "SUCCESS",
                "Blog deleted successfully",
                blogService.deleteBlog(id)
        );
    }

    @PutMapping(path = "/{id}")
    public ApiResponse<BlogDTO> editBlog(
            @RequestBody BlogDTO edittedBlogDTO,
            @PathVariable Long id) {

        return new ApiResponse<>(
                "SUCCESS",
                "Blog updated successfully",
                blogService.editBlog(edittedBlogDTO, id)
        );
    }
}