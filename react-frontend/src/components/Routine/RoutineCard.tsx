import React from 'react'
import type { Exercise, Routine } from '../../interfaces/gym/gymDetails'
import { useQuery } from '@tanstack/react-query';
import { fetchExercises } from '../../api/exercise';

type RoutineCardProps = {
    routine: Routine;   
    openEditDialogBox: () => void;
    updateDataForEditing: (data : Routine) => void,
    deleteRoutine: (id: number) => void
};

const RoutineCard = ({routine, openEditDialogBox, updateDataForEditing, deleteRoutine} : RoutineCardProps) => {
  const handleEdit = () => {
    updateDataForEditing(routine);
    openEditDialogBox();
  };

  const handleDelete = () => {
    deleteRoutine(routine.id);
  };

  const { data: exercises = []} = useQuery({
    queryKey: ['exercises'],
    queryFn: fetchExercises,
  });

  return (
    <div className='routine'>
      <h1>{routine.name}</h1>
      <p>{routine.description}</p>
      <ul>
        {exercises
          .filter((exercise: Exercise) => routine.exerciseIds.includes(exercise.id))
          .map((exercise: Exercise) => (
            <li key={exercise.id}>{exercise.name}</li>
          ))
        }
      </ul>
      <button onClick={()=> handleEdit()}>edit</button>
      <button onClick={()=> handleDelete()}>delete</button>
    </div>
  )
}

export default RoutineCard