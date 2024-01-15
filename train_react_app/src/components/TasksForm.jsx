import React, { useState } from 'react'



const TasksForm = ()=> {
const [taskList, setTaskList] = useState([])

    const addTaskToList = (task)=> {
        setTaskList((previousTaskList) => {
            const newTaskList = [...previousTaskList, task];
            // alert(`taskList : ${newTaskList}`);
            setTaskList(newTaskList)
            return newTaskList;
        })
    }

    const deleteTask = (index, e)=> {
        const updatedTaskList = [...taskList];
        updatedTaskList.splice(index,1)
        setTaskList(updatedTaskList)
    }

const handleSubmit = (e)=> {
    e.preventDefault();
    const form = e.target;
    const elements = form.elements;
    const formData = new FormData(form)
    const task = formData.get("entryTask")
    
    // const task = elements.entryTask.value;
    console.log(elements);
   addTaskToList(task)
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
                                            <input value={task} style={{color: 'black'}}/> 
                                            <button  className='customButton'>Modifier</button>
                                            <button type='button' onClick={()=> deleteTask(index)} className='customButton' >Supprimer</button>
                                        </div>
                                )
                            )   
                        }
                    </div>
              

                </form>  
            </div>
        </div>
    )
}

export default TasksForm;