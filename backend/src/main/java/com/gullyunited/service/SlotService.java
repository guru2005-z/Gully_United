package com.gullyunited.service;

import com.gullyunited.dto.SlotDto;
import com.gullyunited.entity.Ground;
import com.gullyunited.entity.Slot;
import com.gullyunited.repository.GroundRepository;
import com.gullyunited.repository.SlotRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SlotService {

    private final SlotRepository slotRepository;
    private final GroundRepository groundRepository;

    public SlotService(SlotRepository slotRepository, GroundRepository groundRepository) {
        this.slotRepository = slotRepository;
        this.groundRepository = groundRepository;
    }

    @Transactional
    public List<SlotDto> getSlotsForDate(LocalDate date) {
        List<Slot> slots = slotRepository.findBySlotDate(date);
        if (slots.isEmpty()) {
            slots = seedSlotsForDate(date);
        }

        return slots.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public List<Slot> seedSlotsForDate(LocalDate date) {
        Ground ground = groundRepository.findById(1L).orElseGet(() -> {
            Ground defaultGround = new Ground(
                "Gully United Cricket Turf",
                "Kota, Nellore - Premium Box Cricket Turf with Night Floodlights",
                "Kota, Nellore District, Andhra Pradesh - 524411",
                new BigDecimal("14.0321"),
                new BigDecimal("80.0245"),
                "ACTIVE"
            );
            return groundRepository.save(defaultGround);
        });

        String[][] template = {
            {"06:00 AM", "07:00 AM", "299", "false"},
            {"07:00 AM", "08:00 AM", "299", "false"},
            {"08:00 AM", "09:00 AM", "299", "false"},
            {"09:00 AM", "10:00 AM", "299", "false"},
            {"10:00 AM", "11:00 AM", "299", "false"},
            {"11:00 AM", "12:00 PM", "299", "false"},
            {"12:00 PM", "01:00 PM", "299", "false"},
            {"01:00 PM", "02:00 PM", "299", "false"},
            {"02:00 PM", "03:00 PM", "299", "false"},
            {"03:00 PM", "04:00 PM", "299", "false"},
            {"04:00 PM", "05:00 PM", "299", "false"},
            {"05:00 PM", "06:00 PM", "499", "true"},
            {"06:00 PM", "07:00 PM", "499", "true"},
            {"07:00 PM", "08:00 PM", "499", "true"},
            {"08:00 PM", "09:00 PM", "499", "true"},
            {"09:00 PM", "10:00 PM", "499", "true"},
            {"10:00 PM", "11:00 PM", "499", "true"}
        };

        List<Slot> newSlots = new ArrayList<>();
        for (String[] t : template) {
            Slot slot = new Slot(
                ground,
                date,
                t[0],
                t[1],
                new BigDecimal(t[2]),
                "AVAILABLE"
            );
            newSlots.add(slot);
        }

        return slotRepository.saveAll(newSlots);
    }

    @Transactional
    public SlotDto toggleBlockSlot(Long slotId) {
        Slot slot = slotRepository.findById(slotId)
                .orElseThrow(() -> new RuntimeException("Slot not found with id: " + slotId));

        if ("BLOCKED".equalsIgnoreCase(slot.getStatus())) {
            slot.setStatus("AVAILABLE");
        } else {
            slot.setStatus("BLOCKED");
        }

        Slot updated = slotRepository.save(slot);
        return convertToDto(updated);
    }

    private SlotDto convertToDto(Slot slot) {
        boolean isPeak = slot.getStartTime().contains("PM") && !slot.getStartTime().startsWith("12") && !slot.getStartTime().startsWith("01") && !slot.getStartTime().startsWith("02") && !slot.getStartTime().startsWith("03") && !slot.getStartTime().startsWith("04");
        return new SlotDto(
            slot.getId(),
            slot.getStartTime(),
            slot.getEndTime(),
            slot.getPrice(),
            isPeak,
            slot.getStatus(),
            slot.getSlotDate().toString()
        );
    }
}
