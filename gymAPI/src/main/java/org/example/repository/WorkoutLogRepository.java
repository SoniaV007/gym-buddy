package org.example.repository;

import org.example.model.WorkoutLog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface WorkoutLogRepository extends JpaRepository<WorkoutLog, Long> {
    List<WorkoutLog> findByUserIdAndDate(Long userId, LocalDate date);
    List<WorkoutLog> findByUserId(Long userId);
} 