package com.gullyunited.controller;

import com.gullyunited.dto.SlotHoldRequest;
import com.gullyunited.dto.SlotHoldResponse;
import com.gullyunited.entity.SlotHold;
import com.gullyunited.service.SlotLockService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bookings")
public class SlotHoldController {

    private final SlotLockService slotLockService;

    public SlotHoldController(SlotLockService slotLockService) {
        this.slotLockService = slotLockService;
    }

    @PostMapping("/hold")
    public ResponseEntity<SlotHoldResponse> holdSlot(@Valid @RequestBody SlotHoldRequest request) {
        try {
            SlotHold hold = slotLockService.holdSlot(request.getSlotId(), request.getCustomerPhone());
            long expiresAtMillis = hold.getExpiresAt().toInstant().toEpochMilli();
            SlotHoldResponse response = new SlotHoldResponse(
                true,
                hold.getHoldToken(),
                expiresAtMillis,
                "Slot held successfully for 8 minutes"
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            SlotHoldResponse errorResponse = new SlotHoldResponse(
                false,
                null,
                null,
                e.getMessage()
            );
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
}
