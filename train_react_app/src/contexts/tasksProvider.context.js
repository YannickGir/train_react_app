
import React, { createContext, useContext, useState } from 'react';

const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
    const [taskList, setTaskList] = useState([])
    const [editedTask, setEditedTask] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editedIndex, setEditedIndex] = useState(null);
    const [tasksListCompleted, setTasksListCompleted]= useState([])
    
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
        const handleTaskCompleted = (task)=> {
            const confirmDelete = window.confirm("Êtes-vous sûr d'avoir complété cette tâche ?");
            if (confirmDelete) {
            const getTasksListCompleted = [...tasksListCompleted, task];
            localStorage.setItem('tasksCompleted', JSON.stringify(getTasksListCompleted))
           const tasksListCompletedFromStorage = JSON.parse(localStorage.getItem('tasksCompleted'))
            setTasksListCompleted(tasksListCompletedFromStorage)
            deleteCompletedTaskFromTaskList(task)
            console.log(tasksListCompleted)
        }
        }

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
        };
    
        const closeModal = () => {
            console.log("Fermeture de la modal");
            setIsModalOpen(false);
            setEditedTask("");
            setEditedIndex(null);
        };
    
        const handleModalSubmit = () => {
            if (editedIndex !== null) {
                updateTask(editedIndex, editedTask);
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
            updateTask(taskList.findIndex((t) => t === editedTask), task);
            setEditedTask("");
        } else {
            addTaskToList(task);
        }
    
        form.reset(); 
    }

  return (
    <TasksContext.Provider value={{ taskList, addTaskToList, deleteTask, openModal, closeModal, handleModalSubmit, handleSubmit, isModalOpen, setEditedTask, handleTaskCompleted, tasksListCompleted, setTasksListCompleted }}>
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
