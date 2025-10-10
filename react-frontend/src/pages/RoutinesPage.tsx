import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type {AddRoutine, Routine} from '../interfaces/gym/gymDetails'
import "./RoutinePage.css"
import React, { useState } from 'react'
import { editRoutine, fetchRoutines, addRoutine, deleteRoutine } from '../api/routine';
import RoutineCard from '../components/Routine/RoutineCard';
import RoutineForm from '../components/Routine/RoutineForm';
import PageHeading from '../components/shared/PageHeading';

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

  const openEditRoutineForm = () => {
    setIsEditing(true);
  }

  const onSubmitAddRoutine = async (data: AddRoutine) => {
    addRoutineMutation.mutate(data);
    closeForm();
  }

  const onSubmitEditRoutine = async (data: Routine) => {
    editRoutineMutation.mutate(data);
    closeForm();
  }

  const onSubmitDeleteRoutine = async (id:number) => {
    deleteRoutineMutation.mutate(id);
  }

  const closeForm = () => {
    setIsAdding(false);
    setIsEditing(false);
  }

  return (
    <div>
      <PageHeading heading="Routines"  addButtonText="Add Routine" setIsAdding={setIsAdding}/>
      <div className='AllRoutines'>
    {
      routines.map((routine: Routine) => <RoutineCard key={routine.id} routine={routine} openEditDialogBox={openEditRoutineForm} updateDataForEditing={setEditRoutineData} deleteRoutine={onSubmitDeleteRoutine}/>)
    }
    </div>
    {isAdding && <RoutineForm mode="add" closeForm={closeForm} formSubmissionAddFunction={onSubmitAddRoutine}/>}
    {isEditing && <RoutineForm mode="edit" closeForm={closeForm} formSubmissionEditFunction={onSubmitEditRoutine} editRoutineData={editRoutineData}/>}
      </div>
 
 
  )
 }
 
 

export default RoutinesPage