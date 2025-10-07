package org.example.model.dto;

public class ExerciseResponse  {
    private Long id;
    private String name;
    private String description;
    private Long muscleGroupId;
    private Long userId;

    public ExerciseResponse() {}

    // Constructor from Exercise entity
    public ExerciseResponse(org.example.model.entity.Exercise e) {
        this.id = e.getId();
        this.name = e.getName();
        this.description = e.getDescription();
        this.userId = e.getUserId();
        if (e.getMuscleGroup() != null) {
            this.muscleGroupId = e.getMuscleGroup().getId();
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Long getMuscleGroupId() { return muscleGroupId; }
    public void setMuscleGroupId(Long muscleGroupId) { this.muscleGroupId = muscleGroupId; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
}