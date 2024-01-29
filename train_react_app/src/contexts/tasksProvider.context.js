
import React, { createContext, useContext, useState } from 'react';

const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
    const [taskList, setTaskList] = useState([])
    const [editedTask, setEditedTask] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editedIndex, setEditedIndex] = useState(-1);
    const [tasksListCompleted, setTasksListCompleted]= useState([])
    const [editingTask, setEditingTask] = useState("");
    
        const addTaskToList = (task)=> {
            setTaskList((previousTaskList) => {
                const newTaskList = [...previousTaskList, task];
                // alert(`taskList : ${newTaskList}`);
                setTaskList(newTaskList)
                return newTaskList;
            })
        }
    
        const updateTask = (index, newTask) => {
            const updatedTasklist = [...taskList];
            updatedTasklist[index] = newTask
            setTaskList(updatedTasklist)
            setIsModalOpen(false);
            setEditedIndex(null);
        }
    
        const deleteTask = (index) => {
            const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?");
            if (confirmDelete) {
                const updatedTaskList = [...taskList];
                updatedTaskList.splice(index, 1);
                setTaskList(updatedTaskList);
                setEditedIndex(null);
            }
        };
      
        const handleTaskCompleted = (completedTaskIndex) => {
            const confirmDelete = window.confirm("Êtes-vous sûr d'avoir complété cette tâche ?");
            const completedTask = taskList[completedTaskIndex];
            if (confirmDelete) {
                
                const updatedTasksListCompleted = [...tasksListCompleted, completedTask];
                localStorage.setItem('tasksCompleted', JSON.stringify(updatedTasksListCompleted));
                console.log('completedTask:' + completedTask);
                
                const updatedTaskList = taskList.filter(task => task !== completedTask);
                setTaskList(updatedTaskList);
        
                
                setTasksListCompleted(updatedTasksListCompleted);
            }
        };
        const deleteCompletedTaskFromTaskList = (index) => {
                const updatedTaskList = [...taskList];
                updatedTaskList.splice(index, 1);
                setTaskList(updatedTaskList);
        };
    
        const openModal = (index) => {
            console.log("Ouverture de la modal");
            setEditedIndex(index);
            setEditedTask(taskList[index]);
            setIsModalOpen(true);
            setEditingTask(taskList[index]);
        };
    
        const closeModal = () => {
            console.log("Fermeture de la modal");
            setIsModalOpen(false);
            setEditedTask("");
            setEditedIndex(null);
        };
    
        const handleModalSubmit = () => {
            if (editedIndex !== null) {
                updateTask(editedIndex, editingTask);
            }
            closeModal();
        };
    
    const handleSubmit = (e)=> {
        e.preventDefault();
        const form = e.target;
        // const elements = form.elements;
        const formData = new FormData(form)
        const task = formData.get("entryTask")
        
        // const task = elements.entryTask.value;
        // console.log(elements);
       
        if (editedTask !== "") {
            updateTask(editedIndex, task);
            setEditedTask("");
            setEditedIndex(null)
        } else {
            addTaskToList(task);
            if (editedIndex === null) {
                setEditedIndex(taskList.length -1);
              }
        }
    
        form.reset(); 
    }

  return (
    <TasksContext.Provider value={{editingTask, setEditingTask, taskList, addTaskToList, deleteTask, openModal, closeModal, handleModalSubmit, handleSubmit, isModalOpen, setEditedTask, handleTaskCompleted, tasksListCompleted, setTasksListCompleted }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks doit être utilisé à l\'intérieur d\'un TasksProvider');
  }
  return context;
};
