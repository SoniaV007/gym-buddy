package org.example.controller;

import org.example.model.WorkoutLog;
import org.example.service.WorkoutLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Optional;

@RestController
@RequestMapping("/api/workouts")
public class WorkoutLogController {
    @Autowired
    private WorkoutLogService workoutLogService;

    @GetMapping
    public Map<String, Object> getLogsByUserAndDate(@RequestParam Long userId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        if (date != null) {
            response.put("data", workoutLogService.getLogsByUserAndDate(userId, date));
        } else {
            response.put("data", workoutLogService.getLogsByUser(userId));
        }
        return response;
    }

    @PostMapping
    public Map<String, Object> addLog(@RequestBody WorkoutLog log) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("data", workoutLogService.addLog(log));
        return response;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateLog(@PathVariable Long id, @RequestBody WorkoutLog log) {
        Optional<WorkoutLog> existing = workoutLogService.getLogById(id);
        if (existing.isPresent()) {
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("data", workoutLogService.updateLog(id, log));
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public Map<String, Object> deleteLog(@PathVariable Long id) {
        workoutLogService.deleteLog(id);
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        return response;
    }
}