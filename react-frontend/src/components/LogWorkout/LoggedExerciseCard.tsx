import React, { useState } from 'react'
import type { LoggedExercise, Set } from '../../interfaces/gym/gymDetails'
import { useForm } from 'react-hook-form';

const LoggedExerciseCard = ({ loggedExercise , updateLoggedExercises}: { loggedExercise: LoggedExercise, updateLoggedExercises: React.Dispatch<React.SetStateAction<LoggedExercise[]>>
}) => {
  const [showSets, setShowSets] = useState(false);
  const [showSetForm, setShowSetForm] = useState(false);

  const {register, handleSubmit, reset} = useForm<Set>({});

  const addSetDetails = (setData: Set) => {
    
    const repsNum =
      typeof setData.reps === 'number'
        ? setData.reps
        : setData.reps
        ? parseInt(String(setData.reps), 10)
        : 0;
  
    const weightNum =
      typeof setData.weight === 'number'
        ? setData.weight
        : setData.weight
        ? parseFloat(String(setData.weight))
        : 0;
  
    const newSet: Set = {
      setNumber: loggedExercise.sets.length + 1,
      reps: repsNum,
      weight: weightNum,
      note: setData.note ?? '',
    };
  
    // immutably update parent state
    updateLoggedExercises(prev =>
      prev.map(ex =>
        ex.exerciseId === loggedExercise.exerciseId
          ? { ...ex, sets: [...ex.sets, newSet] }
          : ex
      )
    );
  
    reset();
    setShowSetForm(false);
  };
  

  return (
    <>
      <div className="loggedExerciseDiv">
        <h1>{loggedExercise.exerciseName}</h1>
        <button onClick={() => setShowSets(prev => !prev)}>
          Sets ⬇
        </button>
      </div>

      {showSets && (
        <div className="setsDiv">
          <table className="setsTable">
            <thead>
              <tr>
                <th>Set Number</th>
                <th>Reps</th>
                <th>Weight (if applicable)</th>
                <th>Note</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loggedExercise.sets.map((set, idx) => (
                <tr key={idx}>
                  <td>{set.setNumber}</td>
                  <td>{set.reps}</td>
                  <td>{set.weight}</td>
                  <td>{set.note}</td>
                  <td>
                    <button>📝</button>
                    <button>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="addSetContainer">
            {showSetForm && <form className="setFormDiv" onSubmit={handleSubmit(addSetDetails)}>
              <input type='number' hidden {...register("setNumber")}/>
              <input 
                type='number' 
                placeholder='reps' 
                {...register("reps", { valueAsNumber: true })}
                />

                <input 
                type='number' 
                placeholder='weight' 
                {...register("weight", { valueAsNumber: true })}
                />
              <input placeholder='note' {...register("note")}/>
              <button type="submit">submit</button>
            </form>}
            <button onClick={() => setShowSetForm(prev => !prev)}>Add a Set</button>
          </div>
        </div>
      )}
    </>
  )
}

export default LoggedExerciseCard
