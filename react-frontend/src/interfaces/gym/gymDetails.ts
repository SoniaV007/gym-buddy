import type { user } from "../user/user";

export interface Exercise {
    id: number;
    name: string;
    description?: string; 
    muscleGroup: string;
    userId: number
  }

  export interface NewExercise {
    name: string;
    description: string;
    muscleGroup: string;
    userId: number
  };

  export interface Routine {
    id: number;
    name: string;
    description?: string;
    userId : number
    exerciseIds : number[]        //list of exercise ID
  }

  export interface AddRoutine {
    name: string;
    description?: string;
    userId : number
    exerciseIds : number[]
  }

  export interface RoutineEntity {
    id: number;
    name: string;
    description?: string;
    userId : user
    exercises : Exercise       
  }

  export interface Set{
    setNumber : number;
    reps : number;
    weight? : number;
    note?: string
  }

  export type LoggedExercise = {
      exerciseId : number;
      exerciseName: string;   
      sets: Set[];
  };

  export interface logWorkoutRequestBody{
      userId : number,
      exercises : LoggedExercise[],
      date : string
  };