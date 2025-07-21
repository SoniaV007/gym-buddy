package org.example.service;

import org.example.model.WorkoutLog;
import org.example.repository.WorkoutLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class WorkoutLogService {
    @Autowired
    private WorkoutLogRepository workoutLogRepository;

    public List<WorkoutLog> getLogsByUserAndDate(Long userId, LocalDate date) {
        return workoutLogRepository.findByUserIdAndDate(userId, date);
    }

    public List<WorkoutLog> getLogsByUser(Long userId) {
        return workoutLogRepository.findByUserId(userId);
    }

    public Optional<WorkoutLog> getLogById(Long id) {
        return workoutLogRepository.findById(id);
    }

    public WorkoutLog addLog(WorkoutLog log) {
        return workoutLogRepository.save(log);
    }

    public WorkoutLog updateLog(Long id, WorkoutLog updatedLog) {
        updatedLog.setId(id);
        return workoutLogRepository.save(updatedLog);
    }

    public void deleteLog(Long id) {
        workoutLogRepository.deleteById(id);
    }
} 