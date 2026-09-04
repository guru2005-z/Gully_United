package com.gullyunited.dto;

import java.math.BigDecimal;

public class SlotDto {

    private Long id;
    private String startTime;
    private String endTime;
    private BigDecimal price;
    private boolean isPeakHour;
    private String status;
    private String slotDate;

    public SlotDto() {}

    public SlotDto(Long id, String startTime, String endTime, BigDecimal price, boolean isPeakHour, String status, String slotDate) {
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.price = price;
        this.isPeakHour = isPeakHour;
        this.status = status;
        this.slotDate = slotDate;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getStartTime() { return startTime; }
    public void setStartTime(String startTime) { this.startTime = startTime; }

    public String getEndTime() { return endTime; }
    public void setEndTime(String endTime) { this.endTime = endTime; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public boolean isIsPeakHour() { return isPeakHour; }
    public void setIsPeakHour(boolean isPeakHour) { this.isPeakHour = isPeakHour; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getSlotDate() { return slotDate; }
    public void setSlotDate(String slotDate) { this.slotDate = slotDate; }
}
