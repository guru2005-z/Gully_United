package com.gullyunited.dto;

import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public class CreateRazorpayOrderRequest {

    @NotNull(message = "Amount is required")
    private BigDecimal amount;

    private String holdId;

    public CreateRazorpayOrderRequest() {}

    public CreateRazorpayOrderRequest(BigDecimal amount, String holdId) {
        this.amount = amount;
        this.holdId = holdId;
    }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public String getHoldId() { return holdId; }
    public void setHoldId(String holdId) { this.holdId = holdId; }
}
