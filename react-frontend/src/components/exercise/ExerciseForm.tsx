import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addExercises } from '../../api/exercise';
import type { Exercise, MuscleGroup, NewExercise } from '../../interfaces/gym/gymDetails';
import { useForm } from 'react-hook-form';
import Loader from '../Loader/Loader';
import type { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { fetchMuscleGroups } from '../../api/muscleGroup';
import "./exerciseForm.css";
import { useEffect, useState } from 'react';

type FormData = {
  name : string,
  muscleGroupId : string,
  description : string
};

const ExerciseForm = ({mode, editData, closeForm} : {mode: string, editData : Exercise | null, closeForm : () => void}) => {
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      name: '',
      description: '',
      muscleGroupId: ''
    }
  });

    useEffect(() => {
      if(mode === "edit" && editData)
        {
          console.log(String(editData.muscleGroupId));
          reset({
          name : editData?.name,
          muscleGroupId: String(editData.muscleGroupId),
          description : editData.description
        })
      }
    },[editData,reset,mode]);

    const queryClient = useQueryClient();
    const user = useSelector((state: RootState) => state.auth.user);

    const { data: muscleGroups = []} = useQuery({
      queryKey: ['muscleGroups'],      // Unique key for this query
      queryFn: fetchMuscleGroups,      // Function that fetches the data
    });

    const addExerciseMutation = useMutation({
        mutationFn: (data: NewExercise) => addExercises(data),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['exercises'] });
        },
    });

      
      const onSubmitAddExercise = async (data: FormData) => {
        if(mode == "edit"){
          const editingData : Exercise = {
            id : editData?.id ?? 0,
            name: data.name,
            description: data.description,
            muscleGroupId: Number(data.muscleGroupId),
            userId: user?.id ?? 0,
          };
        }
        else{
          const addData : NewExercise = {
            name: data.name,
            description: data.description,
            muscleGroupId: Number(data.muscleGroupId),
            userId: user?.id ?? 0,
          }
          addExerciseMutation.mutate(addData);
        }
        reset();
      }
    
  return (
    <div className='exerciseFormContainer'>
    <div className='exerciseFormInnerDiv'>
      <button onClick={() => { reset(); closeForm();}}>X</button>
    {addExerciseMutation.isPending && <Loader />}

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
    <div>
      <label htmlFor="muscleGroup">Muscle Group:</label>
      <select id="muscleGroup"
        {...register('muscleGroupId', { required: 'muscleGroup is required'})}>
        {muscleGroups.map((item : MuscleGroup) => <option key={item.id} value={String(item.id)}>{item.name}</option>)}
      </select>
    </div>
    <button type="submit">
      Submit
    </button>
    </form>
    </div>
    </div>
  )
}

export default ExerciseForm