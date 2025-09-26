package org.example.model.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "workout_logs")
public class WorkoutLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long log_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private LocalDate date;

    // This is the missing piece! It maps to the LogExercise entity.
    @OneToMany(mappedBy = "log", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LogExercise> exercises;

    // Getters and setters
    public Long getLogId() {
        return log_id;
    }
    public void setLogId(Long id) {
        this.log_id = id;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public LocalDate getDate() {
        return date;
    }
    public void setDate(LocalDate date) {
        this.date = date;
    }
    public List<LogExercise> getExercises() {
        return exercises;
    }
    public void setExercises(List<LogExercise> exercises) {
        this.exercises = exercises;
    }
}