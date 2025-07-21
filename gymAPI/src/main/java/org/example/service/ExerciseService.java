package org.example.service;

import org.example.model.Exercise;
import org.example.repository.ExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExerciseService {
    @Autowired
    private ExerciseRepository exerciseRepository;

    public List<Exercise> getAllExercises() {
        return exerciseRepository.findAll();
    }

    public Optional<Exercise> getExerciseById(Long id) {
        return exerciseRepository.findById(id);
    }

    public Exercise addExercise(Exercise exercise) {
        return exerciseRepository.save(exercise);
    }

    public Exercise updateExercise(Long id, Exercise updatedExercise) {
        updatedExercise.setId(id);
        return exerciseRepository.save(updatedExercise);
    }

    public void deleteExercise(Long id) {
        exerciseRepository.deleteById(id);
    }
} 