package org.example.service;

import org.example.model.dto.RoutineAddRequest;
import org.example.model.dto.RoutineResponse;
import org.example.model.entity.Exercise;
import org.example.model.entity.Routine;
import org.example.model.entity.User;
import org.example.repository.ExerciseRepository;
import org.example.repository.RoutineRepository;
import org.example.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoutineService {

    private final RoutineRepository routineRepository;
    private final UserRepository userRepository;
    private final ExerciseRepository exerciseRepository;

    public RoutineService(RoutineRepository routineRepository,
                          UserRepository userRepository,
                          ExerciseRepository exerciseRepository) {
        this.routineRepository = routineRepository;
        this.userRepository = userRepository;
        this.exerciseRepository = exerciseRepository;
    }

    private RoutineResponse convertToResponseType(Routine routine) {
        RoutineResponse routineResponse = new RoutineResponse();
        routineResponse.setId(routine.getId());
        routineResponse.setName(routine.getName());
        routineResponse.setDescription(routine.getDescription());
        routineResponse.setUserId(routine.getUser().getId());
        routineResponse.setExerciseIds(
                routine.getExercises().stream()
                        .map(Exercise::getId)
                        .toList()
        );
        return routineResponse;
    }

    public List<RoutineResponse> getAllRoutines() {
        return routineRepository.findAll()
                .stream()
                .map(this::convertToResponseType)
                .toList();
    }

    public RoutineResponse getRoutineById(Long id) {
        Routine routine = routineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Routine not found"));
        return convertToResponseType(routine);
    }

    public RoutineResponse addRoutine(RoutineAddRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Exercise> exercises = exerciseRepository.findAllById(request.getExerciseIds());

        Routine newRoutine = new Routine();
        newRoutine.setName(request.getName());
        newRoutine.setUser(user);
        newRoutine.setDescription(request.getDescription());
        newRoutine.setExercises(exercises);

        Routine saved = routineRepository.save(newRoutine);
        return convertToResponseType(saved);
    }

    public RoutineResponse updateRoutine(Long id, RoutineAddRequest updatedRoutine) {
        Routine routine = routineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Routine not found"));

        User user = userRepository.findById(updatedRoutine.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Exercise> exercises = exerciseRepository.findAllById(updatedRoutine.getExerciseIds());

        routine.setName(updatedRoutine.getName());
        routine.setDescription(updatedRoutine.getDescription());
        routine.setUser(user);
        routine.setExercises(exercises);

        Routine updated = routineRepository.save(routine);
        return convertToResponseType(updated);
    }

    public void deleteRoutine(Long id) {
        if (!routineRepository.existsById(id)) {
            throw new RuntimeException("Routine not found with id: " + id);
        }
        routineRepository.deleteById(id);
    }


}
