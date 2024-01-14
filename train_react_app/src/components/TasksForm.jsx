import React from 'react'

const TasksForm = ()=> {

    return (
        <div className='wrapper' >
            <div style={{background:'gray', height:'400px', width:'400px'}}>
              <form >
                <label> Entrez une tâche ici : </label> <br/>
                <input style={{color: 'black'}}/><br/>
                <button>Ajouter une tâche</button>

                <div style={{marginTop:'20px'}}>
                    <label> Liste de vos tâches : </label> <br/>
                    <input style={{color: 'black'}}/> <button>Modifier</button><button style={{marginLeft:'15px'}}>Supprimer</button>
                </div>
              

            </form>  
            </div>
            

        </div>
    )
}

export default TasksForm;