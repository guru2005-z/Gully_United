package com.gullyunited.dto;

import jakarta.validation.constraints.NotNull;

public class SlotHoldRequest {

    @NotNull(message = "Slot ID is required")
    private Long slotId;

    private String dateStr;
    private String customerPhone;

    public SlotHoldRequest() {}

    public SlotHoldRequest(Long slotId, String dateStr, String customerPhone) {
        this.slotId = slotId;
        this.dateStr = dateStr;
        this.customerPhone = customerPhone;
    }

    public Long getSlotId() { return slotId; }
    public void setSlotId(Long slotId) { this.slotId = slotId; }

    public String getDateStr() { return dateStr; }
    public void setDateStr(String dateStr) { this.dateStr = dateStr; }

    public String getCustomerPhone() { return customerPhone; }
    public void setCustomerPhone(String customerPhone) { this.customerPhone = customerPhone; }
}
