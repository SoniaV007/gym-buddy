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
    userId : number
    exercises : number[]
  }

  export interface AddRoutine {
    name: string;
    description?: string;
    userId : number
    exercises : number[]
  }

