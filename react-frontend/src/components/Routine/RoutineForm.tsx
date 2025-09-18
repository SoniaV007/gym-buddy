import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import type { Routine, AddRoutine, Exercise } from '../../interfaces/gym/gymDetails';
import { useQuery } from '@tanstack/react-query';
import { fetchExercises } from '../../api/exercise';


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
  
    const [isAddingExercise, setIsAddingExercise] = useState(false);

    const { data: exercises = [], isLoading, error } = useQuery({
        queryKey: ['exercises'],
        queryFn: fetchExercises,
      });


  const { register, handleSubmit, reset } = useForm<RoutineFormValues>();
  useEffect(() => {
    
    if (mode === "edit" && editRoutineData) {
        const formDefaultData : RoutineFormValues = {
            name : editRoutineData.name,
            description : editRoutineData.description ?? "",
            exercisesList: editRoutineData.exercises.map(exercise => exercise)
        };
        reset(formDefaultData);
        
      }
    
  }, []);


  const handleFormSubmission = (data: RoutineFormValues) => {
    if (mode === "add") {
        const newRoutine : AddRoutine = {
            name: data.name,
            description: data.description,
            userId : 0,
            exercises : data.exercisesList
        };
        console.log(newRoutine);
      formSubmissionAddFunction?.(newRoutine as AddRoutine);
    } else {
        if(editRoutineData)
        {const updatedRoutine : Routine = {
            id: editRoutineData.id,
            name: data.name,
            description: data.description,
            userId : 0,
            exercises : data.exercisesList
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
                            value={exercise.id}
                            {...register("exercisesList", { required: true })}
                            />
                            {exercise.name}
                        </label>
                        ))}
                    </div>
                    )}

                <button onClick={() => setIsAddingExercise(true)}>Add Exercise</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    
    </div>
  )
}

export default RoutineForm