import React from 'react'
import type { Routine } from '../../interfaces/gym/gymDetails'

type RoutineCardProps = {
    routine: Routine;   
    openEditDialogBox: () => void;
    updateDataForEditing: (data : Routine) => void
};

const RoutineCard = ({routine, openEditDialogBox, updateDataForEditing} : RoutineCardProps) => {
  const handleEdit = () => {
    updateDataForEditing(routine);
    openEditDialogBox();
  };

  return (
    <div>
      <h1>{routine.name}</h1>
      <p>{routine.description}</p>
      <ul>
      {
        routine.exercises.map(exercise => <li key ={exercise.id}>{exercise.name}</li>)
      }
      </ul>
      <button onClick={()=> handleEdit()}>edit</button>
      <button>delete</button>
    </div>
  )
}

export default RoutineCard