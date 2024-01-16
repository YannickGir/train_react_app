import React, { useEffect, useState } from 'react'
import { useTasks } from '../contexts/tasksProvider.context';
import {AiOutlineDelete} from 'react-icons/ai';
import DualHoverButtons from './DualHoverButtons ';
import '../styles/ButtonStyles.css';


const TasksForm = ()=> {
    const { handleSubmit, taskList, openModal, deleteTask, isModalOpen, editedTask, setEditedTask, handleModalSubmit, closeModal } = useTasks();
    
    const [isCompletedScreen, setIsCompletedScreen] = useState (false);

    const [isButton1cliked, setIsButton1Cliked] = useState(false);
    const [isButton2cliked, setIsButton2Cliked] = useState(false);

    console.log("isModalOpen:", isModalOpen);
    console.log("editedTask:", editedTask);

    const handleButtonClick = (buttonNumber) => {
        if (buttonNumber === 1) {
          setIsButton1Cliked(true);
          setIsButton2Cliked(false);
    
        } else if (buttonNumber === 2) {
            setIsButton1Cliked(false);
            setIsButton2Cliked(true);
        }
      };

    let taskListNotCompleted = (<> 
                <form onSubmit={handleSubmit} >
                    <label htmlFor='entryTask'> Entrez une tâche ici : </label> <br/>
                    <input type='text' name='entryTask' id='entryTask' style={{color: 'black'}}/><br/>
                    <button type='submit' className='customButton'>Ajouter une tâche</button>

                    <div style={{marginTop:'20px'}}>
                        <label> Liste de vos tâches : </label> <br/>
                        {taskList.map((task, index)=>
                                (
                                        <div key={index} style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                                            <input type='text' value={task} style={{color: 'black', marginLeft:'20%', padding:'auto'}}/> 
                                            <button type='button' onClick={() => openModal(index)}
                                    className='customButton'>Modifier</button>
                                            <AiOutlineDelete style={{alignSelf:'center', hover: 'black'}} title="Delete?" type='button' onClick={()=> deleteTask(index)} className='icon' />
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
    </>)

    let tasksCompleted = (
        <>
            <h1>tasks completed </h1>
        </>
    )

    return (
        <div className='wrapper' >
            <div style={{background:'gray', height:'400px', width:'500px'}}>
                <DualHoverButtons/>
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