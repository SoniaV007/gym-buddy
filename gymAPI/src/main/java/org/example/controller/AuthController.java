package org.example.controller;

import org.example.model.User;
import org.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody User user) {
        User created = userService.signup(user);
        return ResponseEntity.ok(created);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        Optional<User> userOpt = userService.findByUsername(loginRequest.getUsername());
        if (userOpt.isPresent() && userService.checkPassword(userOpt.get(), loginRequest.getPassword())) {
            // TODO: Replace with real JWT
            String dummyJwt = "dummy-jwt-token";
            return ResponseEntity.ok().body("{\"token\": \"" + dummyJwt + "\"}");
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }
} 