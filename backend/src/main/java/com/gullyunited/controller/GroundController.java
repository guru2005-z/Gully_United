package com.gullyunited.controller;

import com.gullyunited.entity.Ground;
import com.gullyunited.repository.GroundRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/grounds")
public class GroundController {

    private final GroundRepository groundRepository;

    public GroundController(GroundRepository groundRepository) {
        this.groundRepository = groundRepository;
    }

    @GetMapping
    public ResponseEntity<List<Ground>> getAllGrounds() {
        List<Ground> grounds = groundRepository.findAll();
        return ResponseEntity.ok(grounds);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ground> getGroundById(@PathVariable Long id) {
        return groundRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
