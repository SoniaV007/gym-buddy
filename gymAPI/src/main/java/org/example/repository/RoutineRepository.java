package org.example.repository;

import org.example.model.Routine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoutineRepository extends JpaRepository<Routine, Long> {
} 