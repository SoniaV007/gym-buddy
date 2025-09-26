import type {logWorkoutRequestBody } from "../interfaces/gym/gymDetails";
import instance from "./axios";


export const logWorkout = async (loggedExercises: logWorkoutRequestBody) => {
    try{
        const response = await instance.post('/workout-logs', loggedExercises);
        return response.data.data;
    }
    catch(error){
        console.error('Error logging workout:', error);
        throw error;
    }
};