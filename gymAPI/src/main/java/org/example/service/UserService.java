package org.example.service;

import org.example.model.dto.UserLogInRequest;
import org.example.model.dto.UserSignUpRequest;
import org.example.model.dto.UserResponse;
import org.example.model.entity.User;
import org.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserResponse signup(UserSignUpRequest user) {
        User newUser = new User();
        newUser.setEmail(user.getEmail());
        newUser.setUsername(user.getName());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(newUser);

        // Map User Entity -> UserResponse
        UserResponse response = new UserResponse();
        response.setId(savedUser.getId());
        response.setName(savedUser.getUsername());
        response.setEmail(savedUser.getEmail());

        return response;
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public boolean checkPassword(User user, String rawPassword) {
        return passwordEncoder.matches(rawPassword, user.getPassword());
    }
} 