package org.example.controller;

import org.example.model.Routine;
import org.example.service.RoutineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/routines")
public class RoutineController {
    @Autowired
    private RoutineService routineService;

    @GetMapping
    public List<Routine> getAllRoutines() {
        return routineService.getAllRoutines();
    }

    @PostMapping
    public Routine addRoutine(@RequestBody Routine routine) {
        return routineService.addRoutine(routine);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Routine> updateRoutine(@PathVariable Long id, @RequestBody Routine routine) {
        Optional<Routine> existing = routineService.getRoutineById(id);
        if (existing.isPresent()) {
            return ResponseEntity.ok(routineService.updateRoutine(id, routine));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoutine(@PathVariable Long id) {
        routineService.deleteRoutine(id);
        return ResponseEntity.noContent().build();
    }
} 