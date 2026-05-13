package com.parking.backend.entity;

import jakarta.persistence.*;

@Entity
@DiscriminatorValue("CAR")
public class Car extends Vehicle {

    public Car() {
        setVehicleType("Car");
    }
}
