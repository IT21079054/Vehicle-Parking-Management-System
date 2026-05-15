package com.parking.backend.controller;

import com.parking.backend.entity.ParkingSlot;
import com.parking.backend.service.ParkingSlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/slots")
public class ParkingSlotController {

    @Autowired
    private ParkingSlotService parkingSlotService;

    @GetMapping
    public List<ParkingSlot> getAll() {
        return parkingSlotService.getAllSlots();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ParkingSlot> getById(@PathVariable Long id) {
        return parkingSlotService.getSlotById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ParkingSlot create(@RequestBody ParkingSlot slot) {
        return parkingSlotService.saveSlot(slot);
    }

    @PutMapping("/{id}")
    public ParkingSlot update(@PathVariable Long id, @RequestBody ParkingSlot slot) {
        return parkingSlotService.updateSlot(id, slot);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        parkingSlotService.deleteSlot(id);
        return ResponseEntity.ok().build();
    }
}
