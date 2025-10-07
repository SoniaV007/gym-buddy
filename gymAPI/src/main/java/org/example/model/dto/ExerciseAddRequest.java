package org.example.model.dto;

public class ExerciseAddRequest {
    private String name;

    private String description;

    private Long muscleGroupId;;

    private Long userId;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Long getMuscleGroupId() { return muscleGroupId; }
    public void setMuscleGroupId(Long muscleGroupId) { this.muscleGroupId = muscleGroupId; }
    public Long getUserId() { return userId; }
    public void setUserId(Long id) { this.userId = id; }
}
