package com.gullyunited.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtils {

    @Value("${jwt.secret:9A2F8C7D6E5B4A3928170F1E2D3C4B5A698778655443322110FFDDEECBBAA99}")
    private String jwtSecret;

    @Value("${jwt.expiration-ms:28800000}")
    private long jwtExpirationMs;

    private Key getSigningKey() {
        byte[] keyBytes = jwtSecret.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(Long userId, String phone, String name, String role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userId);
        claims.put("phone", phone);
        claims.put("name", name);
        claims.put("role", role);

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationMs);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(phone)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public Claims getClaimsFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String getPhoneFromToken(String token) {
        try {
            Claims claims = getClaimsFromToken(token);
            if (claims.get("phone") != null && !claims.get("phone").toString().trim().isEmpty()) {
                return claims.get("phone").toString();
            }
            if (claims.get("user_metadata") instanceof Map) {
                Map<?, ?> metadata = (Map<?, ?>) claims.get("user_metadata");
                if (metadata.get("phone") != null) {
                    return metadata.get("phone").toString();
                }
            }
            return claims.getSubject();
        } catch (Exception e) {
            return null;
        }
    }

    public Long getUserIdFromToken(String token) {
        try {
            Claims claims = getClaimsFromToken(token);
            Number userIdNumber = (Number) claims.get("userId");
            return userIdNumber != null ? userIdNumber.longValue() : null;
        } catch (Exception e) {
            return null;
        }
    }

    public String getRoleFromToken(String token) {
        try {
            Claims claims = getClaimsFromToken(token);
            String role = (String) claims.get("role");
            return role != null ? role : "CUSTOMER";
        } catch (Exception e) {
            return "CUSTOMER";
        }
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
