package com.gullyunited.dto;

import java.math.BigDecimal;

public class AdminStatsResponse {

    private BigDecimal todayRevenue;
    private BigDecimal weeklyRevenue;
    private BigDecimal monthlyRevenue;
    private int occupancyRateToday;
    private int peakHourOccupancy;
    private int totalBookingsToday;

    public AdminStatsResponse() {}

    public AdminStatsResponse(BigDecimal todayRevenue, BigDecimal weeklyRevenue, BigDecimal monthlyRevenue, int occupancyRateToday, int peakHourOccupancy, int totalBookingsToday) {
        this.todayRevenue = todayRevenue;
        this.weeklyRevenue = weeklyRevenue;
        this.monthlyRevenue = monthlyRevenue;
        this.occupancyRateToday = occupancyRateToday;
        this.peakHourOccupancy = peakHourOccupancy;
        this.totalBookingsToday = totalBookingsToday;
    }

    public BigDecimal getTodayRevenue() { return todayRevenue; }
    public void setTodayRevenue(BigDecimal todayRevenue) { this.todayRevenue = todayRevenue; }

    public BigDecimal getWeeklyRevenue() { return weeklyRevenue; }
    public void setWeeklyRevenue(BigDecimal weeklyRevenue) { this.weeklyRevenue = weeklyRevenue; }

    public BigDecimal getMonthlyRevenue() { return monthlyRevenue; }
    public void setMonthlyRevenue(BigDecimal monthlyRevenue) { this.monthlyRevenue = monthlyRevenue; }

    public int getOccupancyRateToday() { return occupancyRateToday; }
    public void setOccupancyRateToday(int occupancyRateToday) { this.occupancyRateToday = occupancyRateToday; }

    public int getPeakHourOccupancy() { return peakHourOccupancy; }
    public void setPeakHourOccupancy(int peakHourOccupancy) { this.peakHourOccupancy = peakHourOccupancy; }

    public int getTotalBookingsToday() { return totalBookingsToday; }
    public void setTotalBookingsToday(int totalBookingsToday) { this.totalBookingsToday = totalBookingsToday; }
}
