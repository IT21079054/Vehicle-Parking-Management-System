package com.parking.backend.service;

import com.parking.backend.entity.Vehicle;
import com.parking.backend.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    public Optional<Vehicle> getVehicleById(Long id) {
        return vehicleRepository.findById(id);
    }

    public Vehicle saveVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    public Vehicle updateVehicle(Long id, Vehicle updatedVehicle) {
        Vehicle vehicle = vehicleRepository.findById(id).orElseThrow();
        vehicle.setVehicleNumber(updatedVehicle.getVehicleNumber());
        vehicle.setVehicleType(updatedVehicle.getVehicleType());
        vehicle.setOwnerName(updatedVehicle.getOwnerName());
        vehicle.setContactNumber(updatedVehicle.getContactNumber());
        vehicle.setEntryTime(updatedVehicle.getEntryTime());
        return vehicleRepository.save(vehicle);
    }

    public void deleteVehicle(Long id) {
        vehicleRepository.deleteById(id);
    }
}
