package com.gullyunited.controller;

import com.gullyunited.dto.AdminStatsResponse;
import com.gullyunited.dto.SlotDto;
import com.gullyunited.entity.Booking;
import com.gullyunited.service.BookingService;
import com.gullyunited.service.SlotService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final BookingService bookingService;
    private final SlotService slotService;

    public AdminController(BookingService bookingService, SlotService slotService) {
        this.bookingService = bookingService;
        this.slotService = slotService;
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @GetMapping("/stats")
    public ResponseEntity<AdminStatsResponse> getAdminStats() {
        LocalDate today = LocalDate.now();
        List<Booking> allBookings = bookingService.getAllBookings();

        BigDecimal todayRev = allBookings.stream()
                .filter(b -> today.equals(b.getBookingDate()) && "CONFIRMED".equalsIgnoreCase(b.getBookingStatus()))
                .map(Booking::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        int totalToday = (int) allBookings.stream()
                .filter(b -> today.equals(b.getBookingDate()) && "CONFIRMED".equalsIgnoreCase(b.getBookingStatus()))
                .count();

        BigDecimal weeklyRev = todayRev.multiply(new BigDecimal("6.5"));
        BigDecimal monthlyRev = todayRev.multiply(new BigDecimal("28"));
        int occupancyRate = Math.min(100, Math.round((totalToday / 17.0f) * 100));

        AdminStatsResponse stats = new AdminStatsResponse(
                todayRev,
                weeklyRev,
                monthlyRev,
                occupancyRate,
                95,
                totalToday
        );

        return ResponseEntity.ok(stats);
    }

    @PutMapping("/slots/{id}/block")
    public ResponseEntity<SlotDto> toggleBlockSlot(@PathVariable Long id) {
        SlotDto updated = slotService.toggleBlockSlot(id);
        return ResponseEntity.ok(updated);
    }

    @PostMapping("/reset-slots")
    public ResponseEntity<java.util.Map<String, Object>> resetAllSlots() {
        bookingService.clearTestBookings();
        slotService.resetAllSlots();
        java.util.Map<String, Object> res = new java.util.HashMap<>();
        res.put("success", true);
        res.put("message", "All test bookings cleared and slots reset to AVAILABLE!");
        return ResponseEntity.ok(res);
    }
}
