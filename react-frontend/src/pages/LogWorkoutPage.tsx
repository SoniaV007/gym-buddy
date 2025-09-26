import React, { useState } from 'react'
import './LogWorkoutPage.css'
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchExercises } from '../api/exercise';
import { fetchRoutines } from '../api/routine';
import type { Exercise, LoggedExercise, logWorkoutRequestBody, Routine, Set } from '../interfaces/gym/gymDetails';
import LoggedExerciseCard from '../components/LogWorkout/LoggedExerciseCard';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { logWorkout } from '../api/logWorkout';

const LogWorkoutPage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [showRoutines, setShowRoutines] = useState(false);
  const [showExercises, setShowExercises] = useState(false);
  const [today, setToday] = useState(new Date());
  const [loggedExercises, setLoggedExercises] = useState<LoggedExercise[]>([]);

  const {data : routines = []} = useQuery({
      queryKey: ['routines'],
      queryFn: fetchRoutines,
    });

  const { data: exercises = []} = useQuery({
    queryKey: ['exercises'],
    queryFn: fetchExercises,
  });

  const addAllExercisesFromRoutineForLog = (exerciseIds: number[]) => {
    for (let id of exerciseIds) {
      const exerciseDetails = exercises.find((exercise : Exercise) => exercise.id === id);
      if (exerciseDetails) {
        const newLoggedExercise: LoggedExercise = {
          exerciseId: exerciseDetails.id,
          exerciseName: exerciseDetails.name,
          sets: [],
        };
        setLoggedExercises(prev => [...prev, newLoggedExercise]);
      }
    }
  };

  const addExerciseForLog = (exerciseDetails: Exercise) => {
    if (exerciseDetails) {
      const newLoggedExercise: LoggedExercise = {
        exerciseId: exerciseDetails.id,
        exerciseName: exerciseDetails.name,
        sets: [],
      };
      setLoggedExercises(prev => [...prev, newLoggedExercise]);
    }
  }

  const addLogMutation = useMutation({
    mutationFn: (data: logWorkoutRequestBody) => logWorkout(data),
  });

  const submitLog = () => {
    const date = new Date();

    const day = String(date.getDate()).padStart(2, '0');      // get day and pad with 0 if needed
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is 0-indexed
    const year = date.getFullYear();

    const formattedDate = `${year}-${month}-${day}`;

    const completeLog : logWorkoutRequestBody = {
      userId : user?.id ?? 0,
      exercises : loggedExercises,
      date : formattedDate
    }

    console.log(completeLog);

    addLogMutation.mutate(completeLog);

  }

  return (
    <>
    <h1>LogWorkoutPage</h1>
    <div className='inputContainer'>
    <input className='dateInput' type='date'></input>
    <div>
      <button className='routineListButton' onClick={() => setShowRoutines(prev => !prev)}>
      Add Routines ⬇
      </button>
      {showRoutines && <div className='listItems'>
        {
          routines.map((routine: Routine) => {return <div className="dropDownValue" key={routine.id}>
            <p>{routine.name}</p>
            <button className="addButton" onClick={() => {addAllExercisesFromRoutineForLog(routine.exerciseIds)}}>+</button>
            </div>})
        }
        </div>}
    </div>
    <div>
      <button className='exerciseListButton' onClick={() => setShowExercises(prev => !prev)}>
      Add Exercises⬇
       </button>
      {showExercises && <div className='listItems'>
        {
          exercises.map((exercise: Exercise) => {return <div className="dropDownValue" key={exercise.id}>
            <p>{exercise.name}</p>
            <button className="addButton" onClick={() => {addExerciseForLog(exercise)}}>+</button>
            </div>})
        }
        </div>}
    </div>
    </div>
    <h1> {today.toLocaleDateString()} </h1>
    <div className='logContainer'>
        {
          loggedExercises.map((exerciseWithSets : LoggedExercise, idx) => <LoggedExerciseCard key={idx} updateLoggedExercises={setLoggedExercises} loggedExercise={exerciseWithSets}/>)
        }
    </div>
    <button onClick={submitLog}>Submit Log</button>
    </>

  )
}

export default LogWorkoutPage