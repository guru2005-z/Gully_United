package com.gullyunited.dto;

import java.math.BigDecimal;

public class RazorpayOrderResponse {
    private boolean success;
    private String orderId;
    private String razorpayKeyId;
    private BigDecimal amount;
    private String currency;
    private String holdId;
    private String message;

    public RazorpayOrderResponse() {}

    public RazorpayOrderResponse(boolean success, String orderId, String razorpayKeyId, BigDecimal amount, String currency, String holdId, String message) {
        this.success = success;
        this.orderId = orderId;
        this.razorpayKeyId = razorpayKeyId;
        this.amount = amount;
        this.currency = currency;
        this.holdId = holdId;
        this.message = message;
    }

    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }

    public String getOrderId() { return orderId; }
    public void setOrderId(String orderId) { this.orderId = orderId; }

    public String getRazorpayKeyId() { return razorpayKeyId; }
    public void setRazorpayKeyId(String razorpayKeyId) { this.razorpayKeyId = razorpayKeyId; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public String getHoldId() { return holdId; }
    public void setHoldId(String holdId) { this.holdId = holdId; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
