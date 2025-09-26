package org.example.service;

import org.example.model.dto.ExerciseAddRequest;
import org.example.model.entity.Exercise;
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

    public Exercise addExercise(ExerciseAddRequest exercise) {
        Exercise newExercise = new Exercise();
        newExercise.setUserId(exercise.getUserId());
        newExercise.setDescription(exercise.getDescription());
        newExercise.setName(exercise.getName());
        newExercise.setMuscleGroup(exercise.getMuscleGroup());
        return exerciseRepository.save(newExercise);
    }

    public Exercise updateExercise(Long id, Exercise updatedExercise) {
        updatedExercise.setId(id);
        return exerciseRepository.save(updatedExercise);
    }

    public void deleteExercise(Long id) {
        exerciseRepository.deleteById(id);
    }
} 