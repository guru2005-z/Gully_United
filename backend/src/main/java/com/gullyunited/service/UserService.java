package com.gullyunited.service;

import com.gullyunited.dto.AuthResponse;
import com.gullyunited.dto.LoginRequest;
import com.gullyunited.dto.RegisterRequest;
import com.gullyunited.entity.User;
import com.gullyunited.repository.UserRepository;
import com.gullyunited.security.JwtUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
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
}
