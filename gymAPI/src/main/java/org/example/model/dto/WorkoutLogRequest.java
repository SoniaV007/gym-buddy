package org.example.model.dto;

import java.time.LocalDate;
import java.util.List;

public class WorkoutLogRequest {

    private Long userId;
    private LocalDate date;
    private List<ExerciseRequest> exercises;

    // Getters and setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public List<ExerciseRequest> getExercises() {
        return exercises;
    }

    public void setExercises(List<ExerciseRequest> exercises) {
        this.exercises = exercises;
    }
}