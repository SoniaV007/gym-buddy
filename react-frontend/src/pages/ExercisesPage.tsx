import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Exercise, NewExercise } from '../interfaces/gym/gymDetails';
import { addExercises, deleteExercises, editExercises, fetchExercises } from '../api/exercise';
import ExerciseCard from '../components/ExerciseCard';
import './ExercisesPage.css';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Loader from '../components/Loader';
import AddExerciseCard from '../components/AddExerciseCard';

const ExercisesPage = () => {
  const queryClient = useQueryClient();
  
  //get exercises
  const { data: exercises = [], isLoading, error } = useQuery({
    queryKey: ['exercises'],      // Unique key for this query
    queryFn: fetchExercises,      // Function that fetches the data
  });
  const [isAdding, setIsAdding] = useState(false);

  const editExerciseMutation = useMutation({
    mutationFn: (data: Exercise) => editExercises(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
    },
  });

  const deleteExerciseMutation = useMutation({
    mutationFn: (id: number) => deleteExercises(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
    },
  });
  
  //edit exercises
  const onSubmitEditExercise = async (data: Exercise) => {
    editExerciseMutation.mutate(data);  
  }

  //delete exercises
  const onSubmitDeleteExercise = async (id: number) => {
    deleteExerciseMutation.mutate(id);
  }
  

  return (
    <div>
      <h1>ExercisesPage</h1>
      {isLoading && <Loader />}
      {error && <div>Error loading exercises</div>}
      {/* Loader for edit mutation */}
      {editExerciseMutation.isPending && <Loader />}
      {/* Loader for delete mutation */}
      {deleteExerciseMutation.isPending && <Loader />}
      {!isLoading && exercises.map((exercise : Exercise) => (
        <ExerciseCard key={exercise.id} exercise={exercise} editFunction={onSubmitEditExercise} deleteFunction={onSubmitDeleteExercise}/>
      ))}
      <button onClick={() => setIsAdding(true)}>Add Exercise</button>
     { isAdding && <AddExerciseCard setIsAdding={setIsAdding}/>}
    </div>
  )
}

export default ExercisesPage