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
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public BlogDTO createBlog(BlogDTO blogDTO) {
        int count = (int) blogRepository.count();

        if (count >= 6) {
            throw new RuntimeException("Cannot create more than 6 blogs!");
        }

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
        return convertToDTO(saved);
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
        return convertToDTO(edittedBlogEntity);
    }

    public List<BlogDTO> getBlogsByEmail(String email) {
        List<BlogEntity> blogs = blogRepository.findByUserEmail(email);
        return blogs.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private BlogDTO convertToDTO(BlogEntity blog) {
        BlogDTO dto = new BlogDTO();
        dto.setId(blog.getId());
        dto.setTitle(blog.getBlogTitle());
        dto.setContent(blog.getBlogContent());
        dto.setDateOfBlog(blog.getDateOfBlog());
        dto.setTimeOfBlog(blog.getTimeOfBlog());

        UserEntity user = blog.getUser();
        if (user != null) {
            dto.setUserEmail(user.getEmail());
            dto.setFirstName(user.getFirstName());
            dto.setLastName(user.getLastName());
            dto.setGender(user.getGender());
            dto.setCompanyName(user.getCompanyName());
        }

        return dto;
    }
}
