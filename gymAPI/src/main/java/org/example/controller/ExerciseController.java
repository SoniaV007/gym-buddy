package org.example.controller;

import org.example.model.dto.ExerciseAddRequest;
import org.example.model.dto.ExerciseResponse;
import org.example.model.entity.Exercise;
import org.example.service.ExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.HashMap;
import java.util.Optional;

@RestController
@RequestMapping("/api/exercises")
public class ExerciseController {
    @Autowired
    private ExerciseService exerciseService;

    @GetMapping
    public Map<String, Object> getAllExercises() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("data", exerciseService.getAllExercises());
        return response;
    }

    @PostMapping
    public Map<String, Object> addExercise(@RequestBody ExerciseAddRequest exercise) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("data", exerciseService.addExercise(exercise));
        return response;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateExercise(
            @PathVariable Long id,
            @RequestBody ExerciseAddRequest request) {

        ExerciseResponse updated = exerciseService.updateExercise(id, request);

        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("data", updated);

        return ResponseEntity.ok(response);
    }


    @DeleteMapping("/{id}")
    public Map<String, Object> deleteExercise(@PathVariable Long id) {
        exerciseService.deleteExercise(id);
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        return response;
    }
}