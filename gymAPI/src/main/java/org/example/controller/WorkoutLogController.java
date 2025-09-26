package org.example.controller;

import org.example.model.dto.WorkoutLogRequest;
import org.example.service.WorkoutLogService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/workout-logs")
public class WorkoutLogController {

    private final WorkoutLogService workoutLogService;

    public WorkoutLogController(WorkoutLogService workoutLogService) {
        this.workoutLogService = workoutLogService;
    }

    @PostMapping
    public ResponseEntity<String> createWorkoutLog(@RequestBody WorkoutLogRequest request) {
        try {
            if (request.getUserId() == null || request.getDate() == null || request.getExercises() == null) {
                return ResponseEntity.badRequest().body("User ID, date, and exercises cannot be null.");
            }

            workoutLogService.createWorkoutLog(request);

            return ResponseEntity.status(HttpStatus.CREATED).body("Workout log created successfully.");
        } catch (Exception e) {
            System.err.println("Error creating workout log: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create workout log.");
        }
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<WorkoutLog> getWorkoutLogById(@PathVariable Long id) {
//        try {
//            WorkoutLog log = workoutLogService.getWorkoutLogById(id);
//            if (log != null) {
//                return ResponseEntity.ok(log);
//            } else {
//                return ResponseEntity.notFound().build();
//            }
//        } catch (Exception e) {
//            System.err.println("Error retrieving workout log: " + e.getMessage());
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }
}