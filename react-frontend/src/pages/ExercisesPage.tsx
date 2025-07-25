import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Exercise, NewExercise } from '../interfaces/gym/gymDetails';
import { addExercises, deleteExercises, editExercises, fetchExercises } from '../api/exercise';
import ExerciseCard from '../components/ExerciseCard';
import './ExercisesPage.css';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const ExercisesPage = () => {
  const { register, handleSubmit, reset } = useForm<NewExercise>();
  const queryClient = useQueryClient();
  
  //get exercises
  const { data: exercises = [], isLoading, error } = useQuery({
    queryKey: ['exercises'],      // Unique key for this query
    queryFn: fetchExercises,      // Function that fetches the data
  });
  const [isAdding, setIsAdding] = useState(false);

  const addExerciseMutation = useMutation({
    mutationFn: (data: NewExercise) => addExercises(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
    },
  });

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
  
  //add exercise
  const onSubmitAddExercise = async (data: NewExercise) => {
    addExerciseMutation.mutate(data);
    setIsAdding(false);
    reset();
  }

  //edit exercises
  const onSubmitEditExercise = async (data: Exercise) => {
    editExerciseMutation.mutate(data);
    reset();
  }

  //delete exercises
  const onSubmitDeleteExercise = async (id: number) => {
    deleteExerciseMutation.mutate(id);
  }
  

  return (
    <div>
      <h1>ExercisesPage</h1>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error loading exercises</div>}
      {exercises.map((exercise : Exercise) => (
        <ExerciseCard key={exercise.id} exercise={exercise} editFunction={onSubmitEditExercise} deleteFunction={onSubmitDeleteExercise}/>
      ))}
      <button onClick={() => setIsAdding(true)}>Add Exercise</button>
     { isAdding && <div>
      <form onSubmit={handleSubmit(onSubmitAddExercise)}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            {...register('name', { required: 'name is required'})}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            id="description"
            {...register('description', { required: 'excerciseDesc is required'})}
          />
        </div>
        <button type="submit">
          Submit
        </button>
        </form>
      </div>}
    </div>
  )
}

export default ExercisesPage