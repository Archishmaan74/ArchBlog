package com.archblog.archblog_backend.controllers;

import com.archblog.archblog_backend.dto.BlogDTO;
import com.archblog.archblog_backend.services.BlogService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/blogs")
public class BlogController {

    private final BlogService blogService;

    private BlogController(BlogService blogService){
        this.blogService = blogService;
    }

    @GetMapping
    public List<BlogDTO> getAllBlogs(){
        return blogService.getAllBogs();
    }

    @PostMapping
    public BlogDTO createBlog(@RequestBody BlogDTO blogDTO){
        return blogService.createBlog(blogDTO);
    }
}
