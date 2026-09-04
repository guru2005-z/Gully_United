package com.gullyunited.repository;

import com.gullyunited.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    Optional<Booking> findByBookingReference(String bookingReference);
    List<Booking> findByUserId(Long userId);
    List<Booking> findByUserIdOrderByBookingDateDesc(Long userId);
    List<Booking> findByUserPhoneOrderByBookingDateDesc(String phone);
    List<Booking> findByBookingDate(LocalDate bookingDate);
    List<Booking> findBySlotIdAndBookingStatusIn(Long slotId, List<String> statuses);
}
