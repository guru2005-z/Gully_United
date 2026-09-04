package com.gullyunited.repository;

import com.gullyunited.entity.SlotHold;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface SlotHoldRepository extends JpaRepository<SlotHold, Long> {
    Optional<SlotHold> findByHoldToken(String holdToken);
    List<SlotHold> findByExpiresAtBeforeAndStatus(OffsetDateTime time, String status);
}
