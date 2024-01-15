import React, { useEffect, useState } from 'react'
import { useTasks } from '../contexts/tasksProvider.context';



const TasksForm = ()=> {
    const { handleSubmit, taskList, openModal, deleteTask, isModalOpen, editedTask, setEditedTask, handleModalSubmit, closeModal } = useTasks();
    
    console.log("isModalOpen:", isModalOpen);
    console.log("editedTask:", editedTask);
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