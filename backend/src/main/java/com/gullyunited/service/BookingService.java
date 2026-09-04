package com.gullyunited.service;

import com.gullyunited.dto.CreateBookingRequest;
import com.gullyunited.entity.Booking;
import com.gullyunited.entity.Slot;
import com.gullyunited.entity.SlotHold;
import com.gullyunited.entity.User;
import com.gullyunited.repository.BookingRepository;
import com.gullyunited.repository.SlotHoldRepository;
import com.gullyunited.repository.SlotRepository;
import com.gullyunited.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final SlotHoldRepository slotHoldRepository;
    private final SlotRepository slotRepository;
    private final UserRepository userRepository;

    public BookingService(BookingRepository bookingRepository, SlotHoldRepository slotHoldRepository, SlotRepository slotRepository, UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.slotHoldRepository = slotHoldRepository;
        this.slotRepository = slotRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Booking confirmBooking(CreateBookingRequest request, String authenticatedPhone) {
        SlotHold hold = slotHoldRepository.findByHoldToken(request.getHoldId())
                .orElseThrow(() -> new IllegalArgumentException("Slot hold expired or invalid. Please re-select your slot."));

        if (!"ACTIVE".equalsIgnoreCase(hold.getStatus())) {
            throw new IllegalStateException("Slot hold is no longer active.");
        }

        if (OffsetDateTime.now().isAfter(hold.getExpiresAt())) {
            hold.setStatus("EXPIRED");
            slotHoldRepository.save(hold);
            Slot slot = hold.getSlot();
            if ("HOLDING".equalsIgnoreCase(slot.getStatus())) {
                slot.setStatus("AVAILABLE");
                slotRepository.save(slot);
            }
            throw new IllegalStateException("Slot hold expired. Please re-select your time slot.");
        }

        Slot slot = hold.getSlot();

        // Mark slot hold as CONFIRMED
        hold.setStatus("CONFIRMED");
        slotHoldRepository.save(hold);

        // Mark slot as BOOKED
        slot.setStatus("BOOKED");
        slotRepository.save(slot);

        // Find user if registered
        String searchPhone = (authenticatedPhone != null && !authenticatedPhone.isEmpty()) ? authenticatedPhone : request.getCustomerPhone();
        User user = userRepository.findByPhone(searchPhone).orElse(null);

        String bookingCode = "GU-" + slot.getSlotDate().toString().replace("-", "") + "-" + UUID.randomUUID().toString().substring(0, 4).toUpperCase();
        String qrSignature = bookingCode + "|" + request.getCustomerPhone() + "|" + slot.getSlotDate().toString();

        Booking booking = new Booking(
                bookingCode,
                user,
                slot.getGround(),
                slot,
                slot.getSlotDate(),
                slot.getStartTime(),
                slot.getEndTime(),
                slot.getPrice(),
                "CONFIRMED",
                "PAID",
                qrSignature
        );

        return bookingRepository.save(booking);
    }

    @Transactional
    public Booking cancelBooking(Long bookingId, String reason) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found with ID: " + bookingId));

        booking.setBookingStatus("CANCELLED");
        booking.setPaymentStatus("REFUNDED");

        Slot slot = booking.getSlot();
        if (slot != null) {
            slot.setStatus("AVAILABLE");
            slotRepository.save(slot);
        }

        return bookingRepository.save(booking);
    }

    public List<Booking> getBookingsForUser(String phone, Long userId) {
        if (userId != null) {
            return bookingRepository.findByUserIdOrderByBookingDateDesc(userId);
        }
        if (phone != null && !phone.trim().isEmpty()) {
            Optional<User> userOpt = userRepository.findByPhone(phone);
            if (userOpt.isPresent()) {
                return bookingRepository.findByUserIdOrderByBookingDateDesc(userOpt.get().getId());
            }
            return bookingRepository.findByUserPhoneOrderByBookingDateDesc(phone);
        }
        return Collections.emptyList();
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Optional<Booking> getBookingByReference(String reference) {
        return bookingRepository.findByBookingReference(reference);
    }
}
