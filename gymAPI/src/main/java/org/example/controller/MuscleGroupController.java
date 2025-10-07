package org.example.controller;

import org.example.repository.MuscleGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/muscleGroup")
public class MuscleGroupController {

    @Autowired
    private MuscleGroupRepository muscleGroupRepository;

    @GetMapping
    public Map<String, Object> getAllMuscleGroups() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("data", muscleGroupRepository.findAll());
        return response;
    }
}
