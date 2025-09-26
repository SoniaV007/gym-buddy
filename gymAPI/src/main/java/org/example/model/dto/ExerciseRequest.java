package org.example.model.dto;

import java.util.List;

public class ExerciseRequest {
    private long exerciseId;
    private String exerciseName;
    private List<SetRequest> sets;

    // Getters and setters
    public long getExerciseId() {
        return exerciseId;
    }

    public void setExerciseId(long exerciseId) {
        this.exerciseId = exerciseId;
    }

    public List<SetRequest> getSets() {
        return sets;
    }

    public void setSets(List<SetRequest> sets) {
        this.sets = sets;
    }
}
