import { ModuleRegistry } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef } from 'ag-grid-community';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Exercise, MuscleGroup, NewExercise } from '../interfaces/gym/gymDetails';
import { addExercises, deleteExercises, editExercises, fetchExercises } from '../api/exercise';
import './ExercisesPage.css';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { fetchMuscleGroups } from '../api/muscleGroup';
import ExerciseForm from '../components/exercise/ExerciseForm';
import { Edit, Trash } from "lucide-react";


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

  const addExerciseMutation = useMutation({
          mutationFn: (data: NewExercise) => addExercises(data),
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['exercises'] });
          },
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
          <Edit 
          size={18} 
          className="btn editButton"
          onClick={() => handleEdit(params.data)}
        />
           <Trash 
          size={18} 
          className="btn trashButton"
          onClick={() => onSubmitDeleteExercise(params.data.id)}
        />
        </div>
      ),
      width: 100,
    },
    { headerName: "Exercise", field: "name", width: 100, },
    { headerName: "Description", field: "description", flex: 1, 
      cellStyle: {
      whiteSpace: 'normal',    // allow wrapping
      overflow: 'visible',     // make overflow visible
      lineHeight: '18px',      // optional: line height for readability
    } },
    { headerName: "Muscle Group", field: "muscleGroupName", width: 150, }
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

  const onSubmitAddExercise = async (data: NewExercise) => {
    addExerciseMutation.mutate(data);  
    closeForm();
    setEditExerciseData(null);
  }
  
  const onSubmitEditExercise = async (data: Exercise) => {
    editExerciseMutation.mutate(data);  
    closeForm();
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
      <div className='pageHeader'>
        <h2>Exercises</h2>
        <button  className="addButtonExercise" onClick={() => setIsAdding(true)}>Add Exercise</button>
      </div>
      {isLoading && <Loader />}
      {error && <div>Error loading exercises</div>}
      {editExerciseMutation.isPending && <Loader />}
      {deleteExerciseMutation.isPending && <Loader />}
      <div className='gridContainer'>
      {!isLoading && 
      <div className='gridDiv'>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={5}
          rowHeight={55}
          headerHeight={50}
        />
      </div>
      }
      </div>

     { isAdding && <ExerciseForm mode="add" editData={null} closeForm={closeForm} addExercise={onSubmitAddExercise} editExercise={null}/>}
     { isEditing && editExerciseData && <ExerciseForm mode="edit"  editData={editExerciseData} closeForm={closeForm} addExercise={null} editExercise={onSubmitEditExercise}/>}
    </div>
  )
}

export default ExercisesPage