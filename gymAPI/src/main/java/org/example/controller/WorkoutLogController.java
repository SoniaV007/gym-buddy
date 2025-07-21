package org.example.controller;

import org.example.model.WorkoutLog;
import org.example.service.WorkoutLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/workouts")
public class WorkoutLogController {
    @Autowired
    private WorkoutLogService workoutLogService;

    @GetMapping
    public List<WorkoutLog> getLogsByUserAndDate(@RequestParam Long userId, @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        if (date != null) {
            return workoutLogService.getLogsByUserAndDate(userId, date);
        } else {
            return workoutLogService.getLogsByUser(userId);
        }
    }

    @PostMapping
    public WorkoutLog addLog(@RequestBody WorkoutLog log) {
        return workoutLogService.addLog(log);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkoutLog> updateLog(@PathVariable Long id, @RequestBody WorkoutLog log) {
        Optional<WorkoutLog> existing = workoutLogService.getLogById(id);
        if (existing.isPresent()) {
            return ResponseEntity.ok(workoutLogService.updateLog(id, log));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLog(@PathVariable Long id) {
        workoutLogService.deleteLog(id);
        return ResponseEntity.noContent().build();
    }
} 