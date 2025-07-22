package org.example.controller;

import org.example.model.User;
import org.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public Map<String, Object> signup(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("data", userService.signup(user));
        return response;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody User loginRequest) {
        Optional<User> userOpt = userService.findByUsername(loginRequest.getUsername());
        Map<String, Object> response = new HashMap<>();
        if (userOpt.isPresent() && userService.checkPassword(userOpt.get(), loginRequest.getPassword())) {
            // TODO: Replace with real JWT
            String dummyJwt = "dummy-jwt-token";
            response.put("status", "success");
            response.put("data", Map.of("token", dummyJwt));
            return ResponseEntity.ok(response);
        }
        response.put("status", "error");
        response.put("message", "Invalid credentials");
        return ResponseEntity.status(401).body(response);
    }
}