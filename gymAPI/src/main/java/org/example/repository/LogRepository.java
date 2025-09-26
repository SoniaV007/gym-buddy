package org.example.repository;

import org.example.model.entity.WorkoutLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LogRepository extends JpaRepository<WorkoutLog, Long> {
}
