import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type {AddRoutine, Routine} from '../interfaces/gym/gymDetails'
import "./RoutinePage.css"
import React, { useState } from 'react'
import { editRoutine, fetchRoutines, addRoutine, deleteRoutine } from '../api/routine';
import RoutineCard from '../components/Routine/RoutineCard';
import RoutineForm from '../components/Routine/RoutineForm';

const RoutinesPage = () => {

  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [editRoutineData, setEditRoutineData] = useState<Routine>();

  const queryClient = useQueryClient();

  const {data : routines = [], isLoading, error} = useQuery({
    queryKey: ['routines'],
    queryFn: fetchRoutines,
  });

  const addRoutineMutation = useMutation({
    mutationFn: (data: AddRoutine) => addRoutine(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routines']});
    }
  });

  const editRoutineMutation = useMutation({
    mutationFn: (data: Routine) => editRoutine(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routines']});
    }
  });

  const deleteRoutineMutation = useMutation({
    mutationFn: (id: number) => deleteRoutine(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routines']});
    }
  });

  const openAddRoutineForm = () => {
    setIsAdding(true);
    console.log("form should open");
  }

  const openEditRoutineForm = () => {
    setIsEditing(true);
  }

  const onSubmitAddRoutine = async (data: AddRoutine) => {
    addRoutineMutation.mutate(data);
    setIsAdding(false);
  }

  const onSubmitEditRoutine = async (data: Routine) => {
    editRoutineMutation.mutate(data);
    setIsEditing(false);
  }

  const onSubmitDeleteRoutine = async (id:number) => {
    deleteRoutineMutation.mutate(id);
  }



  return (
    <>
    <h1>RoutinesPage</h1>
    <button onClick={() => openAddRoutineForm()}>
      Add Routine
    </button>
    <div className='AllRoutines'>
    {
      routines.map((routine: Routine) => <RoutineCard key={routine.id} routine={routine} openEditDialogBox={openEditRoutineForm} updateDataForEditing={setEditRoutineData} deleteRoutine={onSubmitDeleteRoutine}/>)
    }
    </div>
    {isAdding && <RoutineForm mode="add" formSubmissionAddFunction={onSubmitAddRoutine}/>}
    {isEditing && <RoutineForm mode="edit" formSubmissionEditFunction={onSubmitEditRoutine} editRoutineData={editRoutineData}/>}
    </>
    
  )
}

export default RoutinesPage