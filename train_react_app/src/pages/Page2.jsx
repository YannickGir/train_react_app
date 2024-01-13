import { useEffect, useState }from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import ThemeContext from '../contexts/them.context';

export default function Page1() {
 
    const {id} = useParams()
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const userSession = localStorage.getItem('userSession');
        if (userSession) {
          setAuthenticated(true);
        } else {
            navigate("/home") ;
        }
      }, [navigate]);
  return (
    <ThemeContext.Consumer> 
    {
        (value)=> {
            
            <div className='page2'>
                <p>Context Value : {value}</p> test
        <h1> Page2 </h1>
        <p> My id : {id} </p>
    
        
    </div> 
        }
    }
</ThemeContext.Consumer>
   
  )
}

