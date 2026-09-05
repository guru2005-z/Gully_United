package com.gullyunited.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class SendOtpRequest {

    @NotBlank(message = "Phone number is required")
    @Size(min = 10, max = 15, message = "Valid phone number is required")
    private String phoneNumber;

    public SendOtpRequest() {}

    public SendOtpRequest(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
}
