package org.example.controller;

import org.example.model.dto.UserLogInRequest;
import org.example.model.dto.UserResponse;
import org.example.model.dto.UserSignUpRequest;
import org.example.model.entity.User;
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
    public Map<String, Object> signup(@RequestBody UserSignUpRequest user) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("data", userService.signup(user));
        return response;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody UserLogInRequest loginRequest) {
        Map<String, Object> response = new HashMap<>();

        Optional<User> userOpt = userService.findByEmail(loginRequest.getEmail());

        if (userOpt.isEmpty()) {
            response.put("status", "error");
            response.put("message", "User not found. Please sign up.");
            return ResponseEntity.status(404).body(response);
        }

        User userEntity = userOpt.get();

        if (!userService.checkPassword(userEntity, loginRequest.getPassword())) {
            response.put("status", "error");
            response.put("message", "Invalid password.");
            return ResponseEntity.status(401).body(response);
        }

        // success
        UserResponse user = new UserResponse();
        user.setId(userEntity.getId());
        user.setName(userEntity.getUsername()); // ⚠️ use getUsername not setName
        user.setEmail(userEntity.getEmail());

        response.put("status", "success");
        response.put("data", user);

        return ResponseEntity.ok(response);
    }

}