package com.gullyunited.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Base64;

@Service
public class SmsService {

    private static final Logger log = LoggerFactory.getLogger(SmsService.class);

    @Value("${sms.provider:mock}")
    private String provider; // "fast2sms", "twilio", "mock"

    @Value("${sms.fast2sms.api-key:YOUR_FAST2SMS_KEY}")
    private String fast2smsApiKey;

    @Value("${sms.twilio.account-sid:YOUR_TWILIO_SID}")
    private String twilioAccountSid;

    @Value("${sms.twilio.auth-token:YOUR_TWILIO_TOKEN}")
    private String twilioAuthToken;

    @Value("${sms.twilio.from-phone:YOUR_TWILIO_NUMBER}")
    private String twilioFromPhone;

    private final RestTemplate restTemplate = new RestTemplate();

    public boolean sendOtpSms(String phone, String otpCode) {
        log.info("Sending OTP [{}] to mobile number [{}] via provider [{}]", otpCode, phone, provider);

        if ("fast2sms".equalsIgnoreCase(provider) && isConfigured(fast2smsApiKey)) {
            return sendFast2Sms(phone, otpCode);
        } else if ("twilio".equalsIgnoreCase(provider) && isConfigured(twilioAccountSid)) {
            return sendTwilioSms(phone, otpCode);
        } else {
            // Mock / Console Fallback Mode
            log.info("=========================================================================");
            log.info("[SMS MOCK SERVICE] Gully United OTP for {}: [{}]", phone, otpCode);
            log.info("=========================================================================");
            return true;
        }
    }

    private boolean sendFast2Sms(String phone, String otpCode) {
        try {
            String cleanPhone = phone.replaceAll("[^0-9]", "");
            if (cleanPhone.length() > 10) {
                cleanPhone = cleanPhone.substring(cleanPhone.length() - 10);
            }

            String url = "https://www.fast2sms.com/dev/bulkV2?authorization=" + fast2smsApiKey +
                    "&route=otp&variables_values=" + otpCode + "&numbers=" + cleanPhone;

            HttpHeaders headers = new HttpHeaders();
            headers.set("authorization", fast2smsApiKey);
            HttpEntity<String> entity = new HttpEntity<>(headers);

            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
            log.info("Fast2SMS API Response: {}", response.getBody());
            return response.getStatusCode().is2xxSuccessful();
        } catch (Exception e) {
            log.error("Failed to send Fast2SMS OTP to {}", phone, e);
            return false;
        }
    }

    private boolean sendTwilioSms(String phone, String otpCode) {
        try {
            String url = "https://api.twilio.com/2010-04-01/Accounts/" + twilioAccountSid + "/Messages.json";

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            String auth = twilioAccountSid + ":" + twilioAuthToken;
            String encodedAuth = Base64.getEncoder().encodeToString(auth.getBytes());
            headers.set("Authorization", "Basic " + encodedAuth);

            MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
            map.add("To", phone.startsWith("+") ? phone : "+91" + phone);
            map.add("From", twilioFromPhone);
            map.add("Body", "Your Gully United verification code is: " + otpCode + ". Valid for 5 minutes.");

            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
            log.info("Twilio API Response: {}", response.getBody());
            return response.getStatusCode().is2xxSuccessful();
        } catch (Exception e) {
            log.error("Failed to send Twilio SMS to {}", phone, e);
            return false;
        }
    }

    private boolean isConfigured(String val) {
        return val != null && !val.trim().isEmpty() && !val.contains("YOUR_");
    }
}
