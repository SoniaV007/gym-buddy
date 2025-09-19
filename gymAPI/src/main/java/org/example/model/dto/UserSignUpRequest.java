package org.example.model.dto;

import jakarta.persistence.Column;

public class userRequest {
    private String name;

    private String email;

    private String password;

    public String getName() { return name; }
    public void setName(String username) { this.name = username; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
