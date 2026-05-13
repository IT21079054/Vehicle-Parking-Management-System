package com.parking.backend.entity;

import jakarta.persistence.*;

@Entity
@DiscriminatorValue("BIKE")
public class Bike extends Vehicle {

    public Bike() {
        setVehicleType("Bike");
    }
}
