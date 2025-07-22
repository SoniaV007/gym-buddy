package org.example.controller;

import org.example.model.Routine;
import org.example.service.RoutineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Optional;

@RestController
@RequestMapping("/api/routines")
public class RoutineController {
    @Autowired
    private RoutineService routineService;

    @GetMapping
    public Map<String, Object> getAllRoutines() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("data", routineService.getAllRoutines());
        return response;
    }

    @PostMapping
    public Map<String, Object> addRoutine(@RequestBody Routine routine) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("data", routineService.addRoutine(routine));
        return response;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateRoutine(@PathVariable Long id, @RequestBody Routine routine) {
        Optional<Routine> existing = routineService.getRoutineById(id);
        if (existing.isPresent()) {
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("data", routineService.updateRoutine(id, routine));
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public Map<String, Object> deleteRoutine(@PathVariable Long id) {
        routineService.deleteRoutine(id);
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        return response;
    }
}