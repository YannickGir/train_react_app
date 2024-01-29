import React, { useEffect, useState } from 'react'
import { useTasks } from '../contexts/tasksProvider.context';
import {AiOutlineDelete, AiOutlineCheck, AiOutlineForm} from 'react-icons/ai';
import '../styles/ButtonStyles.css';

const TasksForm = ()=> {
    const {editingTask, setEditingTask, handleSubmit, taskList, openModal, deleteTask, isModalOpen, editedTask, setEditedTask, handleModalSubmit, closeModal,  handleTaskCompleted,tasksListCompleted,  setTasksListCompleted } = useTasks();
    
    const [isCompletedScreen, setIsCompletedScreen] = useState (false);
    
   



    
    const deleteCompletedTask = (index) => {
        const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?");
        if (confirmDelete) {
            const updatedTaskListCompleted = [...tasksListCompleted];
            updatedTaskListCompleted.splice(index, 1);
            setTasksListCompleted(updatedTaskListCompleted);
        }
    };


    let taskListNotCompleted = (<> 
                <form onSubmit={handleSubmit} >
                    <label htmlFor='entryTask'> Entrez une tâche ici : </label> <br/>
                    <input type='text' name='entryTask' id='entryTask' style={{color: 'black'}}/><br/>
                    <button className='customButton'>Ajouter une tâche</button>
                    <div style={{marginTop:'20px'}}>
                        <label> Liste de vos tâches : </label> <br/>
                        {taskList.map((task, index)=>
                                (
                                        <div key={index} style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                                            <h3 type='text' style={{color: 'black', marginLeft:'20%', padding:'auto'}}> {task}</h3>
                                            <AiOutlineForm title='Modifier la tache' placeholder={task} onClick={() =>{setEditingTask(task); openModal(index)}} className='iconModify custom-button' />
                                            
                                            <AiOutlineDelete  title="Delete?" type='button' onClick={()=> deleteTask(index)} className='icon custom-button' />
                                            <AiOutlineCheck title='Mettre en tâche complétée' onClick={()=>{handleTaskCompleted(task)}} className='iconValidation'/>
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
                            value={editingTask}
                            onChange={(e) => {setEditingTask(e.target.value);setEditedTask(editingTask)}}
                        />
                        <button onClick={handleModalSubmit} className='customButton'>
                            Valider  
                        </button>
                        <button onClick={closeModal} className='customButton'>
                            Annuler
                        </button>
                    </div>
                )}
    </>)

    let tasksCompleted = (<> 
        {tasksListCompleted && tasksListCompleted.length > 0 ?  tasksListCompleted.map((task, index)=>
            (
                    <div key={index} style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                        <h3 type='text' style={{color: 'black', marginLeft:'20%', padding:'auto'}}> {task}</h3>
                        <AiOutlineDelete  title="Effacer ?" type='button' onClick={()=> deleteCompletedTask(index)} className='icon custom-button' />
                        </div>
            ) 
        )   :  <h2>Aucune tâche complétée actuellement</h2>
    } 
    </>)

    return (
        <div className='wrapper' >
            <div style={{background:'gray', height:'400px', width:'500px'}}>
                <div>
                    <button onClick={() => setIsCompletedScreen(false)}
        className={isCompletedScreen ? 'customButton' : 'customButton cliked'}>
                        Liste des tâches à faire
                    </button>
                    <button onClick={() => setIsCompletedScreen(true)}
        className={isCompletedScreen ? 'customButton cliked' : 'customButton'}>
                        Liste des tâches complétées
                    </button>
                </div>
              {
                isCompletedScreen === false ? taskListNotCompleted : tasksCompleted
              }
            </div>
        </div>
    )
}

export default TasksForm;