import React, { useState } from 'react'



const TasksForm = ()=> {
const [taskList, setTaskList] = useState([])
const [editedTask, setEditedTask] = useState("");
const [isModalOpen, setIsModalOpen] = useState(false);
const [editedIndex, setEditedIndex] = useState(null);

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

    const deleteTask = (index)=> {
        const updatedTaskList = [...taskList];
        updatedTaskList.splice(index,1)
        setTaskList(updatedTaskList)
        setEditedIndex(null);
    }

    const openModal = (index) => {
        setEditedIndex(index);
        setEditedTask(taskList[index]);
        setIsModalOpen(true);
    };

    const closeModal = () => {
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
        <div className='wrapper' >
            <div style={{background:'gray', height:'400px', width:'500px'}}>
              <form onSubmit={handleSubmit} >
                    <label htmlFor='entryTask'> Entrez une tâche ici : </label> <br/>
                    <input type='text' name='entryTask' id='entryTask' style={{color: 'black'}}/><br/>
                    <button type='submit' className='customButton'>Ajouter une tâche</button>

                    <div style={{marginTop:'20px'}}>
                        <label> Liste de vos tâches : </label> <br/>
                        {taskList.map((task, index)=>
                                (
                                        <div key={index}>
                                            <input type='text' value={task} style={{color: 'black'}}/> 
                                            <button type='button' onClick={() => openModal(index)}
                                    className='customButton'>Modifier</button>
                                            <button type='button' onClick={()=> deleteTask(index)} className='customButton' >Supprimer</button>
                                        </div>
                                )
                            )   
                        }
                    </div>
              

                </form>  
                {isModalOpen && (
                    <div className='modal'>
                        <label>Modifier la tâche :</label>
                        <input
                            style={{color:'black'}}
                            type='text'
                            value={editedTask}
                            onChange={(e) => setEditedTask(e.target.value)}
                        />
                        <button onClick={handleModalSubmit} className='customButton'>
                            Valider
                        </button>
                        <button onClick={closeModal} className='customButton'>
                            Annuler
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TasksForm;