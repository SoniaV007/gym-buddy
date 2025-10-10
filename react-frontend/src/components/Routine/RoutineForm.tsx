import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import type { Routine, AddRoutine, Exercise } from '../../interfaces/gym/gymDetails';
import { useQuery } from '@tanstack/react-query';
import { fetchExercises } from '../../api/exercise';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';


type RoutineFormProps = {
    editRoutineData?: Routine;   
    mode: string; 
    formSubmissionAddFunction? : (rouitneData: AddRoutine) => void;
    formSubmissionEditFunction? : (rouitneData: Routine) => void;
    closeForm : () => void;
};


type RoutineFormValues = {
    name : string,
    description : string,
    exercisesList : number[]
};


const RoutineForm = ({ editRoutineData ,mode, formSubmissionAddFunction, formSubmissionEditFunction, closeForm}:RoutineFormProps) => {
    const user = useSelector((state: RootState) => state.auth.user);
  
    const [isAddingExercise, setIsAddingExercise] = useState(false);

    const { data: exercises = []} = useQuery({
        queryKey: ['exercises'],
        queryFn: fetchExercises,
      });


      const { register, handleSubmit, reset, watch, setValue } = useForm<RoutineFormValues>({
        defaultValues: {
          name: "",
          description: "",
          exercisesList: []  // default empty array
        }
      });

      const selectedExercises = watch("exercisesList", []);

      useEffect(() => {
        if (mode === "edit" && editRoutineData) {
          reset({
            name: editRoutineData.name,
            description: editRoutineData.description,
            exercisesList: editRoutineData.exerciseIds || []  // 👈 array of numbers
          });
        }
      }, [mode, editRoutineData, reset]);


  const handleFormSubmission = (data: RoutineFormValues) => {
    if (mode === "add") {
        const newRoutine : AddRoutine = {
            name: data.name,
            description: data.description,
            userId: user?.id ?? 0,
            exerciseIds: data.exercisesList.map(Number)
        };
      formSubmissionAddFunction?.(newRoutine as AddRoutine);
    } else {
        if(editRoutineData)
        {const updatedRoutine : Routine = {
            id: editRoutineData.id,
            name: data.name,
            description: data.description,
            userId: user?.id ?? 0,
            exerciseIds: data.exercisesList.map(Number)
        };
      formSubmissionEditFunction?.(updatedRoutine as Routine);}
    }
  
    reset();
  };
  

  return (
    <div className='routineFormContainer'>
      <div className='routineFormInnerDiv'>
        <div className='formHeader'>
          <h2>Add Routine</h2>
          <button className="closeButton" onClick={() => { reset(); closeForm(); }}>X</button>
        </div>
  
        <form onSubmit={handleSubmit(handleFormSubmission)}>
          <div className='inputDiv'>
            <label htmlFor="name">Routine Name</label>
            <input
              id="name"
              {...register('name', { required: 'Name is required' })}
            />
          </div>
  
          <div className='inputDiv'>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              {...register('description', { required: 'Description is required' })}
            />
          </div>
  
          {isAddingExercise && (
            <div className='inputDiv'>
              <label>Select Exercises</label>
              <div className='checkboxList'>
                {exercises.map((exercise: Exercise) => (
                  <label key={exercise.id} style={{ display: 'block', marginBottom: 8 }}>
                    <input
                      type="checkbox"
                      {...register('exercisesList')}
                      value={exercise.id}
                      checked={selectedExercises.includes(exercise.id)}
                      onChange={(e) => {
                        const selectedId = Number(e.target.value);
                        const newSelected = e.target.checked
                          ? [...selectedExercises, selectedId]
                          : selectedExercises.filter((id) => id !== selectedId);
                        setValue('exercisesList', newSelected, { shouldDirty: true });
                      }}
                    />
                    {exercise.name}
                  </label>
                ))}
              </div>
            </div>
          )}
  
          <div className='buttonDiv'>
            <button
              type="button"
              className="secondaryButton"
              onClick={() => setIsAddingExercise(true)}
            >
              Add Exercise
            </button>
  
            <button className="submitButton" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
}

export default RoutineForm
