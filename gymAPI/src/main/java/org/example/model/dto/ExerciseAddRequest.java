package org.example.model.dto;

public class ExerciseAddRequest {
    private String name;

    private String description;

    private String muscleGroup;

    private Long userId;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getMuscleGroup(){ return muscleGroup; }
    public void setMuscleGroup(String muscleGroup) {
        this.muscleGroup = muscleGroup;
    }
    public Long getUserId() { return userId; }
    public void setUserId(Long id) { this.userId = id; }
}
