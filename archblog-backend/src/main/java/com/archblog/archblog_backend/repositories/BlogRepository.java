package com.archblog.archblog_backend.repositories;

import com.archblog.archblog_backend.entities.BlogEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BlogRepository extends JpaRepository<BlogEntity, Long> {
    List<BlogEntity> findAllByOrderByDateOfBlogDescTimeOfBlogDesc();
}
