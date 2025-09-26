package org.example.model.dto;

import jakarta.persistence.*;
import org.example.model.entity.Exercise;
import org.example.model.entity.User;

import java.util.List;

public class RoutineAddRequest {
    private String name;

    private String description;

    private Long userId;

    private List<Long> exerciseIds;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public List<Long> getExerciseIds() {
        return exerciseIds;
    }

    public void setExerciseIds(List<Long> exerciseIds) {
        this.exerciseIds = exerciseIds;
    }
}
