package com.gullyunited.dto;

import jakarta.validation.constraints.NotBlank;

public class VerifyOtpRequest {

    @NotBlank(message = "Phone number is required")
    private String phoneNumber;

    @NotBlank(message = "OTP code is required")
    private String otpCode;

    public VerifyOtpRequest() {}

    public VerifyOtpRequest(String phoneNumber, String otpCode) {
        this.phoneNumber = phoneNumber;
        this.otpCode = otpCode;
    }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getOtpCode() { return otpCode; }
    public void setOtpCode(String otpCode) { this.otpCode = otpCode; }
}
