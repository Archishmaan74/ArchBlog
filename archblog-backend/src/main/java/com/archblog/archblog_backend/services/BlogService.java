package com.archblog.archblog_backend.services;

import com.archblog.archblog_backend.dto.BlogDTO;
import com.archblog.archblog_backend.entities.BlogEntity;
import com.archblog.archblog_backend.repositories.BlogRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BlogService {

    final BlogRepository blogRepository;
    final ModelMapper modelMapper;

    public BlogService(BlogRepository blogRepository, ModelMapper modelMapper){
        this.blogRepository = blogRepository;
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
        if(count < 6){
            BlogEntity blogEntity = modelMapper.map(blogDTO, BlogEntity.class);
            return modelMapper.map(blogRepository.save(blogEntity), BlogDTO.class);
        } else {
            throw new RuntimeException("Cannot create more than 2 blogs pls!");
        }
    }

    public String deleteBlog(Long id) {
        boolean isPresent = blogRepository.existsById(id);
        if(!isPresent) return "Oops! Blog details not present!";
        blogRepository.deleteById(id);
        return "Blog details deleted!";
    }

    public BlogDTO editBlog(BlogDTO edittedBlogDTO, Long id) {
        BlogEntity existingBlogEntity = blogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog not found with id: " + id));

        existingBlogEntity.setFirstName(edittedBlogDTO.getFirstName());
        existingBlogEntity.setLastName(edittedBlogDTO.getLastName());
        existingBlogEntity.setBlogTitle(edittedBlogDTO.getTitle());
        existingBlogEntity.setBlogContent(edittedBlogDTO.getContent());
        existingBlogEntity.setDateOfBlog(edittedBlogDTO.getDateOfBlog());
        existingBlogEntity.setTimeOfBlog(edittedBlogDTO.getTimeOfBlog());
        existingBlogEntity.setGender(edittedBlogDTO.getGender());
        existingBlogEntity.setCompanyName(edittedBlogDTO.getCompanyName());

        BlogEntity edittedBlogEntity = blogRepository.save(existingBlogEntity);
        return modelMapper.map(edittedBlogEntity, BlogDTO.class);
    }
}
