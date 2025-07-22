import type { Exercise, NewExercise } from "../interfaces/gym/gymDetails";
import instance from "./axios";

export const fetchExercises = async () => {
    try{
        const response = await instance.get('/exercises');
        return response.data.data;
    }
    catch(error){
        console.error('Error fetching exercises:', error);
        throw error;
    }
};

export const addExercises = async (exercise: NewExercise) => {
    try{
        const response = await instance.post('/exercises', exercise);
        return response.data.data;
    }
    catch(error){
        console.error('Error adding exercise:', error);
        throw error;
    }
};

export const editExercises = async (exercise: Exercise) => {
    try{
        const response = await instance.put('/exercises/'+exercise.id, exercise);
        return response.data.data;
    }
    catch(error){
        console.error('Error editing exercise:', error);
        throw error;
    }
};

export const deleteExercises = async (id: number) => {
    try{
        const response = await instance.delete('/exercises/'+id);
        return response.data.data;
    }
    catch(error){
        console.error('Error deleting exercise:', error);
        throw error;
    }
};