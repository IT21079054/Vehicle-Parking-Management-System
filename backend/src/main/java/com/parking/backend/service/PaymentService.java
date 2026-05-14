package com.parking.backend.service;

import com.parking.backend.entity.Payment;
import com.parking.backend.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Optional<Payment> getPaymentById(Long id) {
        return paymentRepository.findById(id);
    }

    public Payment savePayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    public Payment updatePayment(Long id, Payment updatedPayment) {
        Payment payment = paymentRepository.findById(id).orElseThrow();
        payment.setVehicleNumber(updatedPayment.getVehicleNumber());
        payment.setAmount(updatedPayment.getAmount());
        payment.setPaymentDate(updatedPayment.getPaymentDate());
        payment.setPaymentMethod(updatedPayment.getPaymentMethod());
        return paymentRepository.save(payment);
    }

    public void deletePayment(Long id) {
        paymentRepository.deleteById(id);
    }
}
