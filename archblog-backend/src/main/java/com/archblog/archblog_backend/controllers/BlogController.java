package com.archblog.archblog_backend.controllers;

import com.archblog.archblog_backend.configuration.JwtUtil;
import com.archblog.archblog_backend.dto.BlogDTO;
import com.archblog.archblog_backend.services.BlogService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/blogs")
public class BlogController {

    private final BlogService blogService;
    private final JwtUtil jwtUtil;

    private BlogController(BlogService blogService, JwtUtil jwtUtil){
        this.blogService = blogService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping
    public List<BlogDTO> getAllBlogs(){
        return blogService.getAllBogs();
    }

    @GetMapping("/myblogs")
    public List<BlogDTO> getMyBlogs(@RequestHeader("Authorization") String token) {
        String jwt = token.substring(7);
        String email = jwtUtil.extractUsername(jwt);
        return blogService.getBlogsByEmail(email);
    }


    @PostMapping
    public BlogDTO createBlog(@RequestBody BlogDTO blogDTO,
                              @RequestHeader("Authorization") String token) {
        String jwt = token.substring(7);
        String email = jwtUtil.extractUsername(jwt);
        blogDTO.setUserEmail(email);
        return blogService.createBlog(blogDTO);
    }

    @DeleteMapping(path = "/{id}")
    public String deleteBlog(@PathVariable Long id){
        return blogService.deleteBlog(id);
    }

    @PutMapping(path = "/{id}")
    public BlogDTO editBlog(@RequestBody BlogDTO edittedBlogDTO, @PathVariable Long id){
        return blogService.editBlog(edittedBlogDTO, id);
    }
}
