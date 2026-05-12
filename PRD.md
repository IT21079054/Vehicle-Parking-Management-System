# Product Requirements Document (PRD)

# Vehicle Parking Management System

## Student Project – React + Spring Boot + H2 Database

---

# 1. Project Overview

## Project Name
Vehicle Parking Management System

## Project Type
Web-Based Application

## Tools and Technologies
- Frontend: React.js
- Backend: Spring Boot
- Database: H2 Database
- Version Control: GitHub

---

# 2. What is This Project?

This project is a simple web application to manage a vehicle parking area. The admin can use this system to keep track of vehicles, parking slots, payments, and customers.

This project shows:
- CRUD Operations (Create, Read, Update, Delete)
- REST API using Spring Boot
- OOP Concepts like Encapsulation, Inheritance, and Polymorphism
- H2 Database connection
- Admin Login system

---

# 3. Project Goals

## Main Goal
Build a simple parking management web application that the admin can use easily.

## Small Goals
- Admin can login to the system
- Admin can manage vehicle records
- Admin can manage parking slots
- Admin can manage payments
- Admin can manage customer details
- All data is saved in the H2 Database

---

# 4. Who Uses This System?

## Admin
Only the admin uses this system. Admin can:
- Login and logout
- Add, view, update, delete vehicles
- Add, view, update, delete parking slots
- Add, view, update, delete payments
- Add, view, update, delete customers

---

# 5. Features

---

## 5.1 Login Module

### What it does
Admin can login to the system using a username and password.

### Features
- Login
- Logout

### Fields
- Username
- Password

### Pages
- Login Page
- Dashboard Page

### OOP Used
- Encapsulation – User class has private fields with getters and setters

---

## 5.2 Vehicle Management (CRUD)

### What it does
Admin can manage all the vehicles that are parked.

### Features
- Add a new vehicle
- View all vehicles
- Update vehicle details
- Delete a vehicle

### CRUD Table

| Operation | What it does |
|---|---|
| Create | Add new vehicle |
| Read | View vehicle list |
| Update | Edit vehicle details |
| Delete | Remove vehicle |

### Vehicle Fields
- Vehicle Number
- Vehicle Type (Car or Bike)
- Owner Name
- Contact Number
- Entry Time

### Pages
- Add Vehicle Page
- Vehicle List Page
- Edit Vehicle Page

### OOP Used
- Encapsulation – Vehicle class
- Inheritance – Car and Bike classes extend Vehicle class

---

## 5.3 Parking Slot Management (CRUD)

### What it does
Admin can manage the parking slots in the parking area.

### Features
- Add a new slot
- View all slots
- Update slot status
- Delete a slot

### CRUD Table

| Operation | What it does |
|---|---|
| Create | Add new slot |
| Read | View slot list |
| Update | Change slot status |
| Delete | Remove slot |

### Slot Fields
- Slot Number
- Slot Status (Available or Occupied)

### Pages
- Add Slot Page
- Slot List Page
- Edit Slot Page

### OOP Used
- Encapsulation – ParkingSlot class

---

## 5.4 Payment Management (CRUD)

### What it does
Admin can record and manage parking payments.

### Features
- Add a new payment
- View all payments
- Update payment details
- Delete a payment

### CRUD Table

| Operation | What it does |
|---|---|
| Create | Add new payment |
| Read | View payment list |
| Update | Edit payment details |
| Delete | Remove payment |

### Payment Fields
- Vehicle Number
- Amount
- Payment Date

### Pages
- Add Payment Page
- Payment List Page
- Edit Payment Page

### OOP Used
- Polymorphism – different payment method types

---

## 5.5 Customer Management (CRUD)

### What it does
Admin can manage customer information.

### Features
- Add a new customer
- View all customers
- Update customer details
- Delete a customer

### CRUD Table

| Operation | What it does |
|---|---|
| Create | Add new customer |
| Read | View customer list |
| Update | Edit customer details |
| Delete | Remove customer |

### Customer Fields
- Customer Name
- NIC Number
- Contact Number
- Address

### Pages
- Add Customer Page
- Customer List Page
- Edit Customer Page

### OOP Used
- Encapsulation – Customer class

---

# 6. Non-Functional Requirements

| Requirement | Details |
|---|---|
| Performance | Pages should load fast |
| Security | Only admin can login and use the system |
| Usability | Easy to use and understand |
| Reliability | Show proper error messages when something goes wrong |
| Maintainability | Code should be clean and easy to read |

---

# 7. System Design

## Frontend
React.js is used to build:
- Forms for adding and editing data
- Tables for viewing data
- Navigation menu
- API calls to the Spring Boot backend

## Backend
Spring Boot is used for:
- REST API endpoints
- CRUD logic
- Business rules
- H2 Database connection

## Database
H2 Database stores all the data:
- Vehicle records
- Parking slot records
- Payment records
- Customer records
- Admin login details

---

# 8. Class Structure

```
User

Vehicle
 ├── Car
 └── Bike

ParkingSlot
Payment
Customer
```

---

# 9. OOP Concepts Summary

| Concept | Where it is used |
|---|---|
| Encapsulation | User, Vehicle, ParkingSlot, Customer classes – private fields with getters and setters |
| Inheritance | Car and Bike classes extend the Vehicle class |
| Polymorphism | Payment class uses different payment method types |
