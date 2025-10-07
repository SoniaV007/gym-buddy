package org.example.service;

import org.example.model.dto.ExerciseAddRequest;
import org.example.model.dto.ExerciseResponse;
import org.example.model.entity.Exercise;
import org.example.model.entity.MuscleGroup;
import org.example.repository.ExerciseRepository;
import org.example.repository.MuscleGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ExerciseService {
    @Autowired
    private ExerciseRepository exerciseRepository;
    private MuscleGroupRepository muscleGroupRepository;

    ExerciseService(ExerciseRepository exerciseRepository,
                    MuscleGroupRepository muscleGroupRepository){
        this.exerciseRepository = exerciseRepository;
        this.muscleGroupRepository = muscleGroupRepository;
    }

    public List<ExerciseResponse> getAllExercises() {
        return exerciseRepository.findAll()
                .stream()
                .map(ExerciseResponse::new) // convert each Exercise to ExerciseResponse
                .collect(Collectors.toList());
    }

    public Optional<Exercise> getExerciseById(Long id) {
        return exerciseRepository.findById(id);
    }

    public Exercise addExercise(ExerciseAddRequest exercise) {
        Exercise newExercise = new Exercise();
        newExercise.setUserId(exercise.getUserId());
        newExercise.setDescription(exercise.getDescription());
        newExercise.setName(exercise.getName());
        MuscleGroup mg = muscleGroupRepository.findById(exercise.getMuscleGroupId())
                .orElseThrow(() -> new RuntimeException("Muscle group not found"));
        newExercise.setMuscleGroup(mg);
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