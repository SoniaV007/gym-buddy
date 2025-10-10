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

    private final ExerciseRepository exerciseRepository;
    private final MuscleGroupRepository muscleGroupRepository;

    public ExerciseService(ExerciseRepository exerciseRepository,
                           MuscleGroupRepository muscleGroupRepository) {
        this.exerciseRepository = exerciseRepository;
        this.muscleGroupRepository = muscleGroupRepository;
    }

    private ExerciseResponse convertToResponse(Exercise e) {
        return new ExerciseResponse(e);
    }

    public List<ExerciseResponse> getAllExercises() {
        return exerciseRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    public ExerciseResponse getExerciseById(Long id) {
        Exercise exercise = exerciseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exercise not found"));
        return convertToResponse(exercise);
    }

    public ExerciseResponse addExercise(ExerciseAddRequest request) {
        Exercise newExercise = new Exercise();
        newExercise.setUserId(request.getUserId());
        newExercise.setName(request.getName());
        newExercise.setDescription(request.getDescription());

        MuscleGroup muscleGroup = muscleGroupRepository.findById(request.getMuscleGroupId())
                .orElseThrow(() -> new RuntimeException("Muscle group not found"));
        newExercise.setMuscleGroup(muscleGroup);

        Exercise saved = exerciseRepository.save(newExercise);
        return convertToResponse(saved);
    }

    public ExerciseResponse updateExercise(Long id, ExerciseAddRequest request) {
        Exercise existing = exerciseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exercise not found"));

        existing.setName(request.getName());
        existing.setDescription(request.getDescription());

        MuscleGroup muscleGroup = muscleGroupRepository.findById(request.getMuscleGroupId())
                .orElseThrow(() -> new RuntimeException("Muscle group not found"));
        existing.setMuscleGroup(muscleGroup);

        Exercise updated = exerciseRepository.save(existing);
        return convertToResponse(updated);
    }

    public void deleteExercise(Long id) {
        if (!exerciseRepository.existsById(id)) {
            throw new RuntimeException("Exercise not found with id: " + id);
        }
        exerciseRepository.deleteById(id);
    }
}
