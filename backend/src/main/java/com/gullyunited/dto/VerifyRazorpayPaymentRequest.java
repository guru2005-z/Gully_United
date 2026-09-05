package com.gullyunited.dto;

import jakarta.validation.constraints.NotBlank;

public class VerifyRazorpayPaymentRequest {

    @NotBlank(message = "Order ID is required")
    private String orderId;

    @NotBlank(message = "Payment ID is required")
    private String paymentId;

    @NotBlank(message = "Razorpay Signature is required")
    private String signature;

    @NotBlank(message = "Hold ID is required")
    private String holdId;

    private String customerName;
    private String customerPhone;
    private String customerEmail;

    public VerifyRazorpayPaymentRequest() {}

    public VerifyRazorpayPaymentRequest(String orderId, String paymentId, String signature, String holdId, String customerName, String customerPhone, String customerEmail) {
        this.orderId = orderId;
        this.paymentId = paymentId;
        this.signature = signature;
        this.holdId = holdId;
        this.customerName = customerName;
        this.customerPhone = customerPhone;
        this.customerEmail = customerEmail;
    }

    public String getOrderId() { return orderId; }
    public void setOrderId(String orderId) { this.orderId = orderId; }

    public String getPaymentId() { return paymentId; }
    public void setPaymentId(String paymentId) { this.paymentId = paymentId; }

    public String getSignature() { return signature; }
    public void setSignature(String signature) { this.signature = signature; }

    public String getHoldId() { return holdId; }
    public void setHoldId(String holdId) { this.holdId = holdId; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getCustomerPhone() { return customerPhone; }
    public void setCustomerPhone(String customerPhone) { this.customerPhone = customerPhone; }

    public String getCustomerEmail() { return customerEmail; }
    public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }
}
