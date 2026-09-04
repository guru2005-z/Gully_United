package com.gullyunited.controller;

import com.gullyunited.dto.CreateBookingRequest;
import com.gullyunited.entity.Booking;
import com.gullyunited.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public ResponseEntity<?> createBooking(@Valid @RequestBody CreateBookingRequest request) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String authenticatedPhone = null;
            if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getPrincipal())) {
                authenticatedPhone = auth.getPrincipal().toString();
            }

            Booking booking = bookingService.confirmBooking(request, authenticatedPhone);
            return ResponseEntity.status(HttpStatus.CREATED).body(booking);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/my")
    public ResponseEntity<List<Booking>> getMyBookings() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || "anonymousUser".equals(auth.getPrincipal())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String phone = auth.getPrincipal().toString();
        Long userId = auth.getCredentials() instanceof Long ? (Long) auth.getCredentials() : null;

        List<Booking> bookings = bookingService.getBookingsForUser(phone, userId);
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/{bookingCode}")
    public ResponseEntity<Booking> getBookingByReference(@PathVariable String bookingCode) {
        return bookingService.getBookingByReference(bookingCode)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> cancelBooking(@PathVariable Long id, @RequestBody(required = false) Map<String, String> body) {
        try {
            String reason = body != null ? body.get("reason") : "Customer cancelled";
            Booking booking = bookingService.cancelBooking(id, reason);
            Map<String, Object> res = new HashMap<>();
            res.put("success", true);
            res.put("message", "Booking " + booking.getBookingReference() + " cancelled successfully.");
            res.put("booking", booking);
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
