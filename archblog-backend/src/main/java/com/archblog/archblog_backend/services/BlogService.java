package com.archblog.archblog_backend.services;

import com.archblog.archblog_backend.dto.BlogDTO;
import com.archblog.archblog_backend.entities.BlogEntity;
import com.archblog.archblog_backend.entities.UserEntity;
import com.archblog.archblog_backend.repositories.BlogRepository;
import com.archblog.archblog_backend.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BlogService {

    final BlogRepository blogRepository;
    final UserRepository userRepository;
    final ModelMapper modelMapper;

    public BlogService(BlogRepository blogRepository, UserRepository userRepository, ModelMapper modelMapper) {
        this.blogRepository = blogRepository;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    public List<BlogDTO> getAllBogs() {
        return blogRepository.findAllByOrderByDateOfBlogDescTimeOfBlogDesc()
                .stream()
                .map(blogEntity -> modelMapper.map(blogEntity, BlogDTO.class))
                .collect(Collectors.toList());
    }

    public BlogDTO createBlog(BlogDTO blogDTO) {
        int count = (int) blogRepository.count();

        if (count < 6) {
            String email = blogDTO.getUserEmail();
            UserEntity user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            BlogEntity blogEntity = new BlogEntity();
            blogEntity.setBlogTitle(blogDTO.getTitle());
            blogEntity.setBlogContent(blogDTO.getContent());
            blogEntity.setDateOfBlog(LocalDate.now());
            blogEntity.setTimeOfBlog(LocalTime.now());
            blogEntity.setUser(user);

            BlogEntity saved = blogRepository.save(blogEntity);

            BlogDTO response = new BlogDTO();
            response.setId(saved.getId());
            response.setTitle(saved.getBlogTitle());
            response.setContent(saved.getBlogContent());
            response.setUserEmail(user.getEmail());
            response.setDateOfBlog(saved.getDateOfBlog());
            response.setTimeOfBlog(saved.getTimeOfBlog());

            return response;

        } else {
            throw new RuntimeException("Cannot create more than 6 blogs!");
        }
    }

    public String deleteBlog(Long id) {
        boolean isPresent = blogRepository.existsById(id);
        if (!isPresent) return "Oops! Blog details not present!";
        blogRepository.deleteById(id);
        return "Blog details deleted!";
    }

    public BlogDTO editBlog(BlogDTO edittedBlogDTO, Long id) {
        BlogEntity existingBlogEntity = blogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog not found with id: " + id));

        existingBlogEntity.setBlogTitle(edittedBlogDTO.getTitle());
        existingBlogEntity.setBlogContent(edittedBlogDTO.getContent());
        existingBlogEntity.setDateOfBlog(edittedBlogDTO.getDateOfBlog());
        existingBlogEntity.setTimeOfBlog(edittedBlogDTO.getTimeOfBlog());

        BlogEntity edittedBlogEntity = blogRepository.save(existingBlogEntity);
        return modelMapper.map(edittedBlogEntity, BlogDTO.class);
    }

    public List<BlogDTO> getBlogsByEmail(String email) {
        List<BlogEntity> blogs = blogRepository.findByUserEmail(email);

        return blogs.stream()
                .map(blog -> modelMapper.map(blog, BlogDTO.class))
                .collect(Collectors.toList());
    }
}
