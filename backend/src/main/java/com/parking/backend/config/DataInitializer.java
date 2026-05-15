package com.parking.backend.config;

import com.parking.backend.entity.*;
import com.parking.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired private UserRepository userRepository;
    @Autowired private VehicleRepository vehicleRepository;
    @Autowired private ParkingSlotRepository parkingSlotRepository;
    @Autowired private PaymentRepository paymentRepository;
    @Autowired private CustomerRepository customerRepository;

    @Override
    public void run(String... args) {

        // Admin user
        if (userRepository.count() == 0) {
            userRepository.save(new User("admin", "admin123"));
        }

        // Vehicles
        if (vehicleRepository.count() == 0) {
            vehicleRepository.saveAll(List.of(
                vehicle("WP CAA-1234", "Car",  "Kamal Perera",    "0771234567", "2025-05-19T08:30"),
                vehicle("WP CBB-5678", "Car",  "Nimal Silva",     "0712345678", "2025-05-19T09:00"),
                vehicle("CP CDC-9012", "Bike", "Sunil Fernando",  "0761234567", "2025-05-19T09:15"),
                vehicle("EP CDD-3456", "Car",  "Dilani Jayawardena","0751234567","2025-05-19T10:00"),
                vehicle("WP CEE-7890", "Bike", "Ruwan Bandara",   "0781234567", "2025-05-19T10:30"),
                vehicle("SP CFF-2345", "Car",  "Chamari Rajapaksa","0721234567","2025-05-19T11:00"),
                vehicle("NP CGG-6789", "Car",  "Asanka Kumara",   "0791234567", "2025-05-19T11:20"),
                vehicle("WP CHH-0123", "Bike", "Priya Wickramasinghe","0741234567","2025-05-19T12:00")
            ));
        }

        // Parking Slots
        if (parkingSlotRepository.count() == 0) {
            parkingSlotRepository.saveAll(List.of(
                slot("A-01", "Occupied"),
                slot("A-02", "Occupied"),
                slot("A-03", "Available"),
                slot("A-04", "Available"),
                slot("B-01", "Occupied"),
                slot("B-02", "Available"),
                slot("B-03", "Occupied"),
                slot("B-04", "Available"),
                slot("C-01", "Available"),
                slot("C-02", "Occupied"),
                slot("C-03", "Available"),
                slot("C-04", "Available")
            ));
        }

        // Customers
        if (customerRepository.count() == 0) {
            customerRepository.saveAll(List.of(
                customer("Kamal Perera",         "200012345678", "0771234567", "45, Galle Road, Colombo 03"),
                customer("Nimal Silva",           "198534567890", "0712345678", "12, Kandy Road, Kurunegala"),
                customer("Sunil Fernando",        "199078901234", "0761234567", "78, Main Street, Galle"),
                customer("Dilani Jayawardena",    "199223456789", "0751234567", "23, Temple Road, Kandy"),
                customer("Ruwan Bandara",         "198867890123", "0781234567", "56, Station Road, Anuradhapura"),
                customer("Chamari Rajapaksa",     "199545678901", "0721234567", "34, Beach Road, Matara"),
                customer("Asanka Kumara",         "200189012345", "0791234567", "90, High Level Road, Nugegoda"),
                customer("Priya Wickramasinghe",  "199412345678", "0741234567", "67, Peradeniya Road, Kandy")
            ));
        }

        // Payments
        if (paymentRepository.count() == 0) {
            paymentRepository.saveAll(List.of(
                payment("WP CAA-1234", 150.0,  "2025-05-19", "Cash"),
                payment("WP CBB-5678", 200.0,  "2025-05-19", "Card"),
                payment("CP CDC-9012", 100.0,  "2025-05-19", "Cash"),
                payment("EP CDD-3456", 250.0,  "2025-05-18", "Online"),
                payment("WP CEE-7890", 100.0,  "2025-05-18", "Cash"),
                payment("SP CFF-2345", 300.0,  "2025-05-17", "Card"),
                payment("NP CGG-6789", 200.0,  "2025-05-17", "Online"),
                payment("WP CHH-0123", 100.0,  "2025-05-16", "Cash"),
                payment("WP CAA-1234", 150.0,  "2025-05-15", "Card"),
                payment("WP CBB-5678", 200.0,  "2025-05-14", "Online")
            ));
        }
    }

    private Vehicle vehicle(String num, String type, String owner, String contact, String time) {
        Vehicle v = type.equals("Car") ? new Car() : new Bike();
        v.setVehicleNumber(num);
        v.setVehicleType(type);
        v.setOwnerName(owner);
        v.setContactNumber(contact);
        v.setEntryTime(time);
        return v;
    }

    private ParkingSlot slot(String number, String status) {
        ParkingSlot s = new ParkingSlot();
        s.setSlotNumber(number);
        s.setSlotStatus(status);
        return s;
    }

    private Customer customer(String name, String nic, String contact, String address) {
        Customer c = new Customer();
        c.setCustomerName(name);
        c.setNic(nic);
        c.setContactNumber(contact);
        c.setAddress(address);
        return c;
    }

    private Payment payment(String vehicleNum, Double amount, String date, String method) {
        Payment p = new Payment();
        p.setVehicleNumber(vehicleNum);
        p.setAmount(amount);
        p.setPaymentDate(date);
        p.setPaymentMethod(method);
        return p;
    }
}
