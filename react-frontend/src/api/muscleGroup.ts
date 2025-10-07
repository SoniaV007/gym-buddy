import instance from "./axios";

export const fetchMuscleGroups = async () => {
    try{
        const response = await instance.get('/muscleGroup');
        return response.data.data;
    }
    catch(error){
        console.error('Error fetching muscle groups:', error);
        throw error;
    }
};