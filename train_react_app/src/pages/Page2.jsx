import { useContext, useEffect, useState }from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import ThemeContext from '../contexts/theme.context';
import TasksForm from '../components/TasksForm';

export default function Page1() {
 
    const {id} = useParams()
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();

    const value = useContext(ThemeContext)
    useEffect(() => {
        const userSession = localStorage.getItem('userSession');
        if (userSession) {
          setAuthenticated(true);
        } else {
            navigate("/home") ;
        }
      }, [navigate]);
  return (
  
            
            <div className='page2'>
                <p>Context Value : {value}</p>
        <h1> TaskList </h1>
        <p> My id : {id} </p>
        <TasksForm/>
    
        
    </div> 
 
   
  )
}

