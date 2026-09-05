package com.gullyunited.controller;

import com.gullyunited.dto.CreateBookingRequest;
import com.gullyunited.dto.CreateRazorpayOrderRequest;
import com.gullyunited.dto.RazorpayOrderResponse;
import com.gullyunited.dto.VerifyRazorpayPaymentRequest;
import com.gullyunited.entity.Booking;
import com.gullyunited.service.BookingService;
import com.gullyunited.service.RazorpayService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    private final RazorpayService razorpayService;
    private final BookingService bookingService;

    public PaymentController(RazorpayService razorpayService, BookingService bookingService) {
        this.razorpayService = razorpayService;
        this.bookingService = bookingService;
    }

    @PostMapping("/create-order")
    public ResponseEntity<RazorpayOrderResponse> createOrder(@Valid @RequestBody CreateRazorpayOrderRequest request) {
        try {
            String receipt = "RCPT-" + System.currentTimeMillis();
            String orderId = razorpayService.createOrder(receipt, request.getAmount());
            RazorpayOrderResponse response = new RazorpayOrderResponse(
                    true,
                    orderId,
                    razorpayService.getRazorpayKeyId(),
                    request.getAmount(),
                    "INR",
                    request.getHoldId(),
                    "Razorpay order generated successfully"
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            RazorpayOrderResponse errorRes = new RazorpayOrderResponse(
                    false,
                    null,
                    razorpayService.getRazorpayKeyId(),
                    request.getAmount(),
                    "INR",
                    request.getHoldId(),
                    "Error generating payment order: " + e.getMessage()
            );
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorRes);
        }
    }

    @PostMapping("/verify-signature")
    public ResponseEntity<?> verifySignatureAndConfirmBooking(@Valid @RequestBody VerifyRazorpayPaymentRequest request) {
        try {
            boolean isValid = razorpayService.verifySignature(request.getOrderId(), request.getPaymentId(), request.getSignature());
            if (!isValid) {
                Map<String, Object> err = new HashMap<>();
                err.put("success", false);
                err.put("message", "Payment verification failed. Invalid Razorpay signature.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
            }

            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String authenticatedPhone = null;
            if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getPrincipal())) {
                authenticatedPhone = auth.getPrincipal().toString();
            }

            CreateBookingRequest bookingRequest = new CreateBookingRequest(
                    request.getHoldId(),
                    request.getCustomerName() != null ? request.getCustomerName() : "Customer",
                    request.getCustomerPhone() != null ? request.getCustomerPhone() : authenticatedPhone,
                    request.getCustomerEmail()
            );

            Booking booking = bookingService.confirmBooking(bookingRequest, authenticatedPhone);
            return ResponseEntity.status(HttpStatus.CREATED).body(booking);
        } catch (Exception e) {
            Map<String, Object> err = new HashMap<>();
            err.put("success", false);
            err.put("message", "Error confirming booking after payment: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
        }
    }

    @PostMapping("/webhook")
    public ResponseEntity<String> handleWebhook(@RequestBody String payload, @RequestHeader(value = "X-Razorpay-Signature", required = false) String signature) {
        // Razorpay Webhook processing endpoint
        return ResponseEntity.ok("OK");
    }
}
