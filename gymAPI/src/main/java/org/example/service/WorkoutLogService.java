package org.example.service;

import org.example.model.dto.WorkoutLogRequest;
import org.example.model.entity.LogExercise;
import org.example.model.entity.ExerciseSet;
import org.example.model.entity.WorkoutLog;
import org.example.repository.LogRepository;
import org.example.repository.ExerciseRepository;
import org.example.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WorkoutLogService {

    private final LogRepository logRepository;
    private final ExerciseRepository exerciseRepository;
    private final UserRepository userRepository;

    public WorkoutLogService(LogRepository logRepository, ExerciseRepository exerciseRepository, UserRepository userRepository) {
        this.logRepository = logRepository;
        this.exerciseRepository = exerciseRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public void createWorkoutLog(WorkoutLogRequest request) {
        WorkoutLog log = new WorkoutLog();
        log.setDate(request.getDate());
        log.setUser(userRepository.findById(request.getUserId()).orElseThrow(() -> new RuntimeException("User not found")));

        List<LogExercise> logExercises = request.getExercises().stream()
                .map(exerciseRequest -> {
                    LogExercise logExercise = new LogExercise();

                    logExercise.setLog(log);

                    logExercise.setExercise(exerciseRepository.findById(exerciseRequest.getExerciseId()).orElseThrow(() -> new RuntimeException("Exercise not found")));

                    List<ExerciseSet> exerciseSets = exerciseRequest.getSets().stream()
                            .map(setRequest -> {
                                ExerciseSet exerciseSet = new ExerciseSet();
                                exerciseSet.setSetNumber(setRequest.getSetNumber());
                                exerciseSet.setReps(setRequest.getReps());
                                exerciseSet.setWeight(setRequest.getWeight());
                                exerciseSet.setNote(setRequest.getNote());

                                exerciseSet.setLogExercise(logExercise);

                                return exerciseSet;
                            })
                            .collect(Collectors.toList());

                    logExercise.setSets(exerciseSets);
                    return logExercise;
                })
                .collect(Collectors.toList());

        log.setExercises(logExercises);

        logRepository.save(log);
    }
}