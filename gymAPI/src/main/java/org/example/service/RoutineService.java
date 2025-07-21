package org.example.service;

import org.example.model.Routine;
import org.example.repository.RoutineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoutineService {
    @Autowired
    private RoutineRepository routineRepository;

    public List<Routine> getAllRoutines() {
        return routineRepository.findAll();
    }

    public Optional<Routine> getRoutineById(Long id) {
        return routineRepository.findById(id);
    }

    public Routine addRoutine(Routine routine) {
        return routineRepository.save(routine);
    }

    public Routine updateRoutine(Long id, Routine updatedRoutine) {
        updatedRoutine.setId(id);
        return routineRepository.save(updatedRoutine);
    }

    public void deleteRoutine(Long id) {
        routineRepository.deleteById(id);
    }
} 