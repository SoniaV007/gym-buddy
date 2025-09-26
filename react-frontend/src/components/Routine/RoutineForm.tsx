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
};


type RoutineFormValues = {
    name : string,
    description : string,
    exercisesList : number[]
};


const RoutineForm = ({ editRoutineData ,mode, formSubmissionAddFunction, formSubmissionEditFunction}:RoutineFormProps) => {
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
    <div className="routineFormContainer">
        <div className="routineFormInnerDiv">
            <form onSubmit={handleSubmit(handleFormSubmission)}>
                <input {...register("name",{required: "Name is required"})} placeholder='Name of the Routine'></input>
                <textarea {...register("description", {required: "desscription is required"})} placeholder='Description'></textarea>
                {isAddingExercise && (
                    <div>
                        {exercises.map((exercise: Exercise) => (
                        <label key={exercise.id} style={{ display: "block", marginBottom: 8 }}>
                            <input
                                type="checkbox"
                                {...register("exercisesList")}
                                value={exercise.id}
                                checked={selectedExercises.includes(exercise.id)}
                                onChange={(e) => {
                                    const selectedId = Number(e.target.value);
                                    const newSelected = e.target.checked
                                        ? [...selectedExercises, selectedId]
                                        : selectedExercises.filter((id) => id !== selectedId);
                                    setValue("exercisesList", newSelected, { shouldDirty: true });
                                }}
                            />
                            {exercise.name}
                        </label>
                        ))}
                    </div>
                    )}

                <button type="button" onClick={() => setIsAddingExercise(true)}>Add Exercise</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    
    </div>
  )
}

export default RoutineForm
