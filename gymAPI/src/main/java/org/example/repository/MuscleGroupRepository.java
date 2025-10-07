package org.example.repository;

import org.example.model.entity.MuscleGroup;
import org.example.model.entity.WorkoutLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MuscleGroupRepository extends JpaRepository<MuscleGroup, Long> {
}