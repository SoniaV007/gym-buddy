package org.example.model.dto;

public class SetRequest {

    private Integer setNumber;
    private Integer reps;
    private Double weight;
    private String note;

    // Getters and setters
    public Integer getReps() {
        return reps;
    }

    public void setReps(Integer reps) {
        this.reps = reps;
    }

    public Integer getSetNumber() {
        return setNumber;
    }

    public void setSetNumber(Integer set) {
        this.setNumber = set;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
