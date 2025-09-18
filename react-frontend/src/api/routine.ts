import type { AddRoutine, Routine } from "../interfaces/gym/gymDetails";
import instance from "./axios";

export const fetchRoutines = async () => {
    try{
        const response = await instance.get('/routines');
        return response.data.data;
    }
    catch(error){
        console.error('Error fetching routines:', error);
        throw error;
    }
};

export const addRoutine = async (routine: AddRoutine) => {
    try{
        const response = await instance.post('/routines', routine);
        return response.data.data;
    }
    catch(error){
        console.error('Error adding routine:', error);
        throw error;
    }
};

export const editRoutine = async (routine: Routine) => {
    try{
        const response = await instance.put('/routines/'+routine.id, routine);
        return response.data.data;
    }
    catch(error){
        console.error('Error editing routine:', error);
        throw error;
    }
};

export const deleteRoutine = async (id: number) => {
    try{
        const response = await instance.delete('/routine/'+id);
        return response.data.data;
    }
    catch(error){
        console.error('Error deleting routine:', error);
        throw error;
    }
};