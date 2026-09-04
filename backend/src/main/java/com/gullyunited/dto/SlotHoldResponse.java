package com.gullyunited.dto;

public class SlotHoldResponse {

    private boolean success;
    private String holdId;
    private Long expiresAt;
    private String message;

    public SlotHoldResponse() {}

    public SlotHoldResponse(boolean success, String holdId, Long expiresAt, String message) {
        this.success = success;
        this.holdId = holdId;
        this.expiresAt = expiresAt;
        this.message = message;
    }

    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }

    public String getHoldId() { return holdId; }
    public void setHoldId(String holdId) { this.holdId = holdId; }

    public Long getExpiresAt() { return expiresAt; }
    public void setExpiresAt(Long expiresAt) { this.expiresAt = expiresAt; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
