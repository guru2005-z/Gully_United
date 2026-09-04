package com.gullyunited.repository;

import com.gullyunited.entity.Ground;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface GroundRepository extends JpaRepository<Ground, Long> {
    List<Ground> findByStatus(String status);
}
