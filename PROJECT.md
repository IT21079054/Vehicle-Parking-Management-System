# Vehicle Parking Management System
### Student Project — React + Spring Boot + H2 Database

---

## 1. Project Overview

This is a web-based Vehicle Parking Management System. The admin can manage vehicles, parking slots, payments, and customers using this system. It is built using React.js for the frontend and Spring Boot for the backend with H2 as the in-memory database.

---

## 2. Technology Stack

| Part       | Technology           |
|------------|----------------------|
| Frontend   | React.js             |
| Backend    | Spring Boot (Java)   |
| Database   | H2 (in-memory)       |
| UI Design  | Bootstrap 5          |
| IDE        | IntelliJ IDEA        |
| Version Control | GitHub          |

---

## 3. Project Modules

| Module           | Operations               |
|------------------|--------------------------|
| Login            | Login, Logout            |
| Vehicle Management | Add, View, Edit, Delete |
| Parking Slot Management | Add, View, Edit, Delete |
| Payment Management | Add, View, Edit, Delete |
| Customer Management | Add, View, Edit, Delete |

---

## 4. OOP Concepts Used

### 4.1 Encapsulation

Encapsulation means keeping the data (fields) of a class private and allowing access only through public getter and setter methods.

**Example — User class:**

```java
public class User {

    private String username;
    private String password;

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
```

**Used in:** `User`, `Vehicle`, `ParkingSlot`, `Payment`, `Customer` classes.

---

### 4.2 Inheritance

Inheritance means a child class gets all the properties and methods from a parent class.

**Example — Car and Bike extend Vehicle:**

```java
public class Vehicle {
    private String vehicleNumber;
    private String vehicleType;
    private String ownerName;
    // getters and setters...
}

public class Car extends Vehicle {
    public Car() { setVehicleType("Car"); }
}

public class Bike extends Vehicle {
    public Bike() { setVehicleType("Bike"); }
}
```

**Class Structure:**
```
Vehicle  (Parent)
 ├── Car   (Child)
 └── Bike  (Child)
```

---

### 4.3 Polymorphism

Polymorphism means one method works in different ways. The same `savePayment()` method handles Cash, Card, or Online payments.

```java
public Payment savePayment(Payment payment) {
    return paymentRepository.save(payment);
}
```

---

## 5. Class Structure

```
com.parking.backend
├── entity       → User, Vehicle, Car, Bike, ParkingSlot, Payment, Customer
├── repository   → JPA repositories for each entity
├── service      → Business logic for each module
├── controller   → REST API endpoints
└── config       → CorsConfig, DataInitializer
```

---

## 6. REST API Endpoints

| Method | Endpoint              | Description      |
|--------|-----------------------|------------------|
| POST   | /api/auth/login       | Admin login      |
| GET    | /api/vehicles         | Get all vehicles |
| POST   | /api/vehicles         | Add vehicle      |
| PUT    | /api/vehicles/{id}    | Update vehicle   |
| DELETE | /api/vehicles/{id}    | Delete vehicle   |
| GET    | /api/slots            | Get all slots    |
| POST   | /api/slots            | Add slot         |
| PUT    | /api/slots/{id}       | Update slot      |
| DELETE | /api/slots/{id}       | Delete slot      |
| GET    | /api/payments         | Get all payments |
| POST   | /api/payments         | Add payment      |
| PUT    | /api/payments/{id}    | Update payment   |
| DELETE | /api/payments/{id}    | Delete payment   |
| GET    | /api/customers        | Get all customers|
| POST   | /api/customers        | Add customer     |
| PUT    | /api/customers/{id}   | Update customer  |
| DELETE | /api/customers/{id}   | Delete customer  |

---

## 7. How to Run

### Step 1 — Start Backend
```
cd backend
mvn spring-boot:run
```
Backend: **http://localhost:8080**

### Step 2 — Start Frontend
```
cd frontend
npm start
```
Frontend: **http://localhost:3000**

### Step 3 — Login
```
Username : admin
Password : admin123
```

---

## 8. Default Admin

```
Username : admin
Password : admin123
```
