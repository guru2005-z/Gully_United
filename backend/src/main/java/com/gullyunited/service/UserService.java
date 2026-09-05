package com.gullyunited.service;

import com.gullyunited.dto.AuthResponse;
import com.gullyunited.dto.LoginRequest;
import com.gullyunited.dto.RegisterRequest;
import com.gullyunited.entity.User;
import com.gullyunited.dto.OtpResponse;
import com.gullyunited.dto.SendOtpRequest;
import com.gullyunited.dto.VerifyOtpRequest;
import com.gullyunited.entity.OtpVerification;
import com.gullyunited.repository.OtpVerificationRepository;
import com.gullyunited.repository.UserRepository;
import com.gullyunited.security.JwtUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.OffsetDateTime;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final OtpVerificationRepository otpVerificationRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final SmsService smsService;
    private final SecureRandom secureRandom = new SecureRandom();

    public UserService(UserRepository userRepository, OtpVerificationRepository otpVerificationRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils, SmsService smsService) {
        this.userRepository = userRepository;
        this.otpVerificationRepository = otpVerificationRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
        this.smsService = smsService;
    }

    @Transactional
    public AuthResponse registerUser(RegisterRequest request) {
        String phone = request.getPhoneNumber() != null ? request.getPhoneNumber().trim() : "";

        if (phone.isEmpty()) {
            return new AuthResponse(false, "Phone number is required", null, null, null, null, null, null);
        }

        if (userRepository.existsByPhone(phone)) {
            return new AuthResponse(false, "Phone number is already registered", null, null, null, null, null, null);
        }

        String encodedPassword = passwordEncoder.encode(request.getPassword());
        User user = new User(
            request.getFullName(),
            phone,
            request.getEmail(),
            encodedPassword,
            request.getRole() != null ? request.getRole() : "CUSTOMER"
        );

        User savedUser = userRepository.save(user);
        String realJwt = jwtUtils.generateToken(savedUser.getId(), savedUser.getPhone(), savedUser.getName(), savedUser.getRole());

        return new AuthResponse(
            true,
            "User registered successfully",
            savedUser.getId(),
            savedUser.getName(),
            savedUser.getPhone(),
            savedUser.getEmail(),
            savedUser.getRole(),
            realJwt
        );
    }

    public AuthResponse loginUser(LoginRequest request) {
        String phone = request.getPhoneNumber() != null ? request.getPhoneNumber().trim() : "";
        Optional<User> userOptional = userRepository.findByPhone(phone);

        if (userOptional.isEmpty()) {
            return new AuthResponse(false, "Invalid phone number or password", null, null, null, null, null, null);
        }

        User user = userOptional.get();
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return new AuthResponse(false, "Invalid phone number or password", null, null, null, null, null, null);
        }

        String realJwt = jwtUtils.generateToken(user.getId(), user.getPhone(), user.getName(), user.getRole());

        return new AuthResponse(
            true,
            "Login successful",
            user.getId(),
            user.getName(),
            user.getPhone(),
            user.getEmail(),
            user.getRole(),
            realJwt
        );
    }

    public Optional<User> findByPhone(String phone) {
        return userRepository.findByPhone(phone);
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Transactional
    public OtpResponse sendOtp(SendOtpRequest request) {
        String phone = request.getPhoneNumber() != null ? request.getPhoneNumber().trim() : "";
        if (phone.isEmpty()) {
            return new OtpResponse(false, "Phone number is required");
        }

        // Generate 6-digit OTP
        int code = 100000 + secureRandom.nextInt(900000);
        String otpCode = String.valueOf(code);

        OffsetDateTime expiresAt = OffsetDateTime.now().plusMinutes(5);
        OtpVerification verification = new OtpVerification(phone, otpCode, expiresAt);
        otpVerificationRepository.save(verification);

        boolean sent = smsService.sendOtpSms(phone, otpCode);
        if (sent) {
            return new OtpResponse(true, "OTP sent successfully to " + phone);
        } else {
            return new OtpResponse(false, "Failed to send SMS OTP. Please try again.");
        }
    }

    @Transactional
    public OtpResponse verifyOtp(VerifyOtpRequest request) {
        String phone = request.getPhoneNumber() != null ? request.getPhoneNumber().trim() : "";
        String code = request.getOtpCode() != null ? request.getOtpCode().trim() : "";

        if (phone.isEmpty() || code.isEmpty()) {
            return new OtpResponse(false, "Phone and OTP code are required");
        }

        Optional<OtpVerification> opt = otpVerificationRepository.findTopByPhoneOrderByCreatedAtDesc(phone);
        if (opt.isEmpty()) {
            return new OtpResponse(false, "No OTP request found for this phone number");
        }

        OtpVerification otp = opt.get();
        if (OffsetDateTime.now().isAfter(otp.getExpiresAt())) {
            return new OtpResponse(false, "OTP has expired. Please request a new OTP.");
        }

        if (!otp.getOtpCode().equals(code)) {
            return new OtpResponse(false, "Invalid OTP code. Please check and try again.");
        }

        otp.setVerified(true);
        otpVerificationRepository.save(otp);

        // Check if user already exists
        Optional<User> userOpt = userRepository.findByPhone(phone);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            String jwt = jwtUtils.generateToken(user.getId(), user.getPhone(), user.getName(), user.getRole());
            return new OtpResponse(true, "OTP verified successfully. Login granted.", jwt);
        }

        return new OtpResponse(true, "OTP verified successfully. Proceed to complete registration.");
    }
}
