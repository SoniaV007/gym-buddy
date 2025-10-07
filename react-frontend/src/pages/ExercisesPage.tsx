import { ModuleRegistry } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef } from 'ag-grid-community';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Exercise, MuscleGroup } from '../interfaces/gym/gymDetails';
import { deleteExercises, editExercises, fetchExercises } from '../api/exercise';
import './ExercisesPage.css';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { fetchMuscleGroups } from '../api/muscleGroup';
import ExerciseForm from '../components/exercise/ExerciseForm';

ModuleRegistry.registerModules([AllCommunityModule]);

const ExercisesPage = () => {
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { data: muscleGroups = []} = useQuery({
        queryKey: ['muscleGroups'],      
        queryFn: fetchMuscleGroups,      
      });
  
  const { data: exercises = [], isLoading, error } = useQuery({
    queryKey: ['exercises'],      
    queryFn: fetchExercises,      
  });

  const editExerciseMutation = useMutation({
    mutationFn: (data: Exercise) => editExercises(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
    },
  });

  const deleteExerciseMutation = useMutation({
    mutationFn: (id: number) => deleteExercises(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
    },
  });

  const [editExerciseData, setEditExerciseData] = useState<Exercise | null>(null);

  const handleEdit = (row : Exercise) => {
    setEditExerciseData(row);
    setIsEditing(true);
  }

  const [rowData, setRowData] = useState<Exercise[]>([]);
  const [columnDefs] = useState<ColDef[]>([
    {
      headerName: "Actions",
      field: "actions" as any, 
      cellRenderer: (params: any) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={() => handleEdit(params.data)}>Edit</button>
          <button>Delete</button>
        </div>
      ),
    },
    { headerName: "Exercise", field: "name", flex: 1 },
    { headerName: "Description", field: "description", flex: 2 },
    { headerName: "Muscle Group", field: "muscleGroupName" }
  ]);

  useEffect(() => {
   const mappedData = exercises.map((exercise: Exercise) => ({
      name: exercise.name,
      description: exercise.description || "",   
      muscleGroupName: muscleGroups.find(
        (item: MuscleGroup) => item.id === exercise.muscleGroupId
      )?.name || "",
      id: exercise.id,
      muscleGroupId: exercise.muscleGroupId
    }));
  
    setRowData(mappedData);
  }, [exercises]);
  
  const onSubmitEditExercise = async (data: Exercise) => {
    editExerciseMutation.mutate(data);  
  }

  const onSubmitDeleteExercise = async (id: number) => {
    deleteExerciseMutation.mutate(id);
  }

  const closeForm = () => {
    setIsAdding(false);
    setIsEditing(false);
  }

  return (
    <div>
      <div style={{ display: "flex" , justifyContent:"space-between"}}>
        <h1>ExercisesPage</h1>
        <button onClick={() => setIsAdding(true)}>Add Exercise</button>
      </div>
      {isLoading && <Loader />}
      {error && <div>Error loading exercises</div>}
      {editExerciseMutation.isPending && <Loader />}
      {deleteExerciseMutation.isPending && <Loader />}

      {!isLoading && 
      <div style={{ height: "600px", width: "800px" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={5}
        />
      </div>
      }

     { isAdding && <ExerciseForm mode="add" editData={null} closeForm={closeForm} />}
     { isEditing && editExerciseData && <ExerciseForm mode="edit"  editData={editExerciseData} closeForm={closeForm}/>}
    </div>
  )
}

export default ExercisesPage