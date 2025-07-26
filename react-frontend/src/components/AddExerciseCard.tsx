import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addExercises } from '../api/exercise';
import type { NewExercise } from '../interfaces/gym/gymDetails';
import { useForm } from 'react-hook-form';
import Loader from './Loader';

const AddExerciseCard = ({setIsAdding} : {setIsAdding: (isAdding: boolean) => void}) => {
    const { register, handleSubmit, reset } = useForm<NewExercise>();
    const queryClient = useQueryClient();

    const addExerciseMutation = useMutation({
        mutationFn: (data: NewExercise) => addExercises(data),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['exercises'] });
        },
      });

      
      const onSubmitAddExercise = async (data: NewExercise) => {
        addExerciseMutation.mutate(data);
        setIsAdding(false);
        reset();
      }
    
  return (
    <>

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
        <button type="submit">
          Submit
        </button>
        </form>
    </>
  )
}

export default AddExerciseCard