package com.gullyunited.service;

import com.gullyunited.entity.Slot;
import com.gullyunited.entity.SlotHold;
import com.gullyunited.repository.BookingRepository;
import com.gullyunited.repository.SlotHoldRepository;
import com.gullyunited.repository.SlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class SlotLockService {

    @Autowired
    private SlotRepository slotRepository;

    @Autowired
    private SlotHoldRepository slotHoldRepository;

    @Autowired
    private BookingRepository bookingRepository;

    /**
     * Acquire a temporary 8-minute hold on a slot using database row-level locking (SELECT ... FOR UPDATE)
     */
    @Transactional
    public SlotHold holdSlot(Long slotId, String phone) {
        // Pessimistic Row Lock (SELECT ... FOR UPDATE) blocks concurrent threads attempting to lock slotId
        Slot slot = slotRepository.findByIdForUpdate(slotId)
                .orElseThrow(() -> new RuntimeException("Time slot not found"));

        if ("BOOKED".equalsIgnoreCase(slot.getStatus())) {
            throw new IllegalStateException("Slot is already booked by another customer");
        }

        if ("HOLDING".equalsIgnoreCase(slot.getStatus())) {
            throw new IllegalStateException("Slot is currently locked by another customer in checkout");
        }

        if ("BLOCKED".equalsIgnoreCase(slot.getStatus())) {
            throw new IllegalStateException("Slot is blocked by ground management");
        }

        // Mark slot as HOLDING
        slot.setStatus("HOLDING");
        slotRepository.save(slot);

        // Create 8-minute expiration hold token
        String holdToken = "HOLD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        OffsetDateTime expiresAt = OffsetDateTime.now().plusMinutes(8);

        SlotHold hold = new SlotHold(slot, null, phone, holdToken, expiresAt);
        return slotHoldRepository.save(hold);
    }

    /**
     * Spring Scheduled Background Job: Clean up expired locks every 30 seconds
     */
    @Scheduled(fixedRate = 30000)
    @Transactional
    public void cleanupExpiredHolds() {
        OffsetDateTime now = OffsetDateTime.now();
        List<SlotHold> expiredHolds = slotHoldRepository.findByExpiresAtBeforeAndStatus(now, "ACTIVE");

        for (SlotHold hold : expiredHolds) {
            hold.setStatus("EXPIRED");
            slotHoldRepository.save(hold);

            Slot slot = hold.getSlot();
            if ("HOLDING".equalsIgnoreCase(slot.getStatus())) {
                slot.setStatus("AVAILABLE");
                slotRepository.save(slot);
            }
        }
    }
}
