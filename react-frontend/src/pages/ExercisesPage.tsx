import { useEffect, useState } from 'react'
import type { Exercise, NewExercise } from '../interfaces/gym/gymDetails';
import { addExercises, deleteExercises, editExercises, fetchExercises } from '../api/exercise';
import ExerciseCard from '../components/ExerciseCard';
import './ExercisesPage.css';
import { useForm } from 'react-hook-form';

const ExercisesPage = () => {
  const { register, handleSubmit, reset } = useForm<NewExercise>();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    getExercise();
  }, []);

    //get exercises
  const getExercise = async () => {
    try {
      const data = await fetchExercises();
      setExercises(data);
    } catch (error) {
      console.error('Error getting exercise:', error);
    }
  }

  //add exercise
  const onSubmitAddExercise = async (data: NewExercise) => {
    try {
      await addExercises(data);
      const updatedList = await fetchExercises();
      setExercises(updatedList);
      setIsAdding(false);
      reset();
    } catch (error) {
      console.error('Error adding exercise:', error);
    }
  }

  //edit exercises
  const onSubmitEditExercise = async (data: Exercise) => {
    try {
      await editExercises(data);
      const updatedList = await fetchExercises();
      setExercises(updatedList);
      reset();
    } catch (error) {
      console.error('Error editing exercise:', error);
    }
  }

  //delete exercises
  const onSubmitDeleteExercise = async (id: number) => {
    try {
      await deleteExercises(id);
      const updatedList = await fetchExercises();
      setExercises(updatedList);
      reset();
    } catch (error) {
      console.error('Error editing exercise:', error);
    }
  }
  

  return (
    <div>
      <h1>ExercisesPage</h1>
      {exercises.map((exercise) => (
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