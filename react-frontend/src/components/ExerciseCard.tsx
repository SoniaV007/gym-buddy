import { useState } from "react";
import type { Exercise } from "../interfaces/gym/gymDetails";
import './ExerciseCard.css';
import { useForm } from "react-hook-form";

interface ExerciseCardProps {
  exercise : Exercise,
  editFunction : (exercise : Exercise) => void,
  deleteFunction : (id : number) => void,
}

const ExerciseCard = ({ exercise , editFunction , deleteFunction}: ExerciseCardProps) => {

  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, reset } = useForm<Exercise>();

  const onSubmitEditExercise = (editedExercise : Exercise) => {
    editFunction(editedExercise);
    setIsEditing(false);
    reset();
  }

  return (
    <div className="exercise-card">
      <div className="exercise-card-actions">
        {/* Edit Icon */}
        <span className="exercise-card-icon" title="Edit" onClick={() => setIsEditing(true)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFD600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z"/></svg>
        </span>
        {/* Delete Icon */}
        <span className="exercise-card-icon" title="Delete" onClick={() => deleteFunction(exercise.id)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF5252" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
        </span>
      </div>
      { !isEditing &&
        <div>  
      <label className="exercise-card-label">Name</label>
      <p className="exercise-card-name">{exercise.name}</p>
      <label className="exercise-card-label">Description</label>
      <p className="exercise-card-description">{exercise.description}</p>
      </div>}


     {isEditing && (
      <form onSubmit={handleSubmit(onSubmitEditExercise)}>
        <input type="hidden" {...register('id')} value={exercise.id} />
        <label className="exercise-card-label" htmlFor={`name-${exercise.id}`}>Name</label>
        <input
          id={`name-${exercise.id}`}
          className="exercise-card-name"
          {...register('name', { required: true })}
          defaultValue={exercise.name}
        />
        <label className="exercise-card-label" htmlFor={`desc-${exercise.id}`}>Description</label>
        <input
          id={`desc-${exercise.id}`}
          className="exercise-card-description"
          {...register('description', { required: true })}
          defaultValue={exercise.description}
        />
        <button type="submit">Edit</button>
      </form>
     )}
    </div>
  )
}

export default ExerciseCard