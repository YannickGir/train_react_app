import React from 'react'

const TasksForm = ()=> {
const handleSubmit = (e)=> {
    e.preventDefault();
    const form = e.target;
    const elements = form.elements;
    const task = elements.entryTask.value;
    console.log(elements);
    alert(`task :${task}`)

}
    return (
        <div className='wrapper' >
            <div style={{background:'gray', height:'400px', width:'500px'}}>
              <form onSubmit={handleSubmit} >
                <label htmlFor='entryTask'> Entrez une tâche ici : </label> <br/>
                <input type='text' id='entryTask' style={{color: 'black'}}/><br/>
                <button type='submit' className='customButton'>Ajouter une tâche</button>

                <div style={{marginTop:'20px'}}>
                    <label> Liste de vos tâches : </label> <br/>
                    <input style={{color: 'black'}}/> <button className='customButton'>Modifier</button><button className='customButton' >Supprimer</button>
                </div>
              

            </form>  
            </div>
            

        </div>
    )
}

export default TasksForm;