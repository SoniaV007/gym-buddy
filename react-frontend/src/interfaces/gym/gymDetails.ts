import type { user } from "../user/user";

export interface Exercise {
    id: number;
    name: string;
    description?: string; 
    muscleGroup: string;
  }

  export interface NewExercise {
    name: string;
    description: string;
    muscleGroup: string;
  };

  export interface Routine {
    id: number;
    name: string;
    description?: string;
    user : user
    exercises : Exercise[]
  }

  export interface NewRoutine {
    name: string;
    description?: string;
    user : user
    exercises : Exercise[]
  }

