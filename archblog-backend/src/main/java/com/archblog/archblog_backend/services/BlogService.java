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
        return blogRepository.findAll().stream().map(blogEntity -> modelMapper.map(blogEntity, BlogDTO.class)).collect(Collectors.toList());
    }

    public BlogDTO createBlog(BlogDTO blogDTO) {
        BlogEntity blogEntity = modelMapper.map(blogDTO, BlogEntity.class);
        return modelMapper.map(blogRepository.save(blogEntity), BlogDTO.class);
    }
}
