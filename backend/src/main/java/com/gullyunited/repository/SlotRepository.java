package com.gullyunited.repository;

import com.gullyunited.entity.Slot;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface SlotRepository extends JpaRepository<Slot, Long> {

    List<Slot> findByGroundIdAndSlotDate(Long groundId, LocalDate date);

    List<Slot> findBySlotDate(LocalDate date);

    List<Slot> findBySlotDateAndStatus(LocalDate date, String status);

    // Transactional Pessimistic Row Lock (SELECT ... FOR UPDATE) to prevent double-bookings
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT s FROM Slot s WHERE s.id = :slotId")
    Optional<Slot> findByIdForUpdate(@Param("slotId") Long slotId);
}
