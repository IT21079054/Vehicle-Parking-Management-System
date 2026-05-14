package com.parking.backend.service;

import com.parking.backend.entity.ParkingSlot;
import com.parking.backend.repository.ParkingSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ParkingSlotService {

    @Autowired
    private ParkingSlotRepository parkingSlotRepository;

    public List<ParkingSlot> getAllSlots() {
        return parkingSlotRepository.findAll();
    }

    public Optional<ParkingSlot> getSlotById(Long id) {
        return parkingSlotRepository.findById(id);
    }

    public ParkingSlot saveSlot(ParkingSlot slot) {
        return parkingSlotRepository.save(slot);
    }

    public ParkingSlot updateSlot(Long id, ParkingSlot updatedSlot) {
        ParkingSlot slot = parkingSlotRepository.findById(id).orElseThrow();
        slot.setSlotNumber(updatedSlot.getSlotNumber());
        slot.setSlotStatus(updatedSlot.getSlotStatus());
        return parkingSlotRepository.save(slot);
    }

    public void deleteSlot(Long id) {
        parkingSlotRepository.deleteById(id);
    }
}
