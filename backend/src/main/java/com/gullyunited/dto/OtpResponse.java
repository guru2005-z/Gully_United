package com.gullyunited.dto;

public class OtpResponse {
    private boolean success;
    private String message;
    private String token; // Optional JWT token if login on verify

    public OtpResponse() {}

    public OtpResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public OtpResponse(boolean success, String message, String token) {
        this.success = success;
        this.message = message;
        this.token = token;
    }

    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
}
