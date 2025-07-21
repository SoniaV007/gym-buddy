package org.example.controller;

import org.example.model.Exercise;
import org.example.service.ExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/exercises")
public class ExerciseController {
    @Autowired
    private ExerciseService exerciseService;

    @GetMapping
    public List<Exercise> getAllExercises() {
        return exerciseService.getAllExercises();
    }

    @PostMapping
    public Exercise addExercise(@RequestBody Exercise exercise) {
        return exerciseService.addExercise(exercise);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Exercise> updateExercise(@PathVariable Long id, @RequestBody Exercise exercise) {
        Optional<Exercise> existing = exerciseService.getExerciseById(id);
        if (existing.isPresent()) {
            return ResponseEntity.ok(exerciseService.updateExercise(id, exercise));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExercise(@PathVariable Long id) {
        exerciseService.deleteExercise(id);
        return ResponseEntity.noContent().build();
    }
} 