
import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, createBrowserRouter, RouterProvider, Outlet, useRouteError, useNavigation, Spinner } from 'react-router-dom';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Home from './pages/Home';
import { useNavigate } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';



function App() {

    const Router = createBrowserRouter ([
        {
            path : '/',
            element:
                <Root/>,
            errorElement: <ErrorPage/>,
            children : [
                {
                    path : 'SignUpPage',
                    element:
                    <div>
                    <SignUpPage/>
                    <button style={{padding:'8px', margin:'8px'}}>  
                        <Link to={'/SignInPage'} >Se connecter</Link>
                    </button>
                    </div>
                    },
                {
                     path : 'SignInPage',
                    element:
                    <div>
                    <SignInPage/>
                    <button style={{padding:'8px', margin:'8px'}}>  
                            <Link to={'/SignUpPage'} >s'inscrire</Link>
                        </button>
                    </div>
                    },
                {
                    path:'home',
                    element: <div className="row">
                        <aside className="col-3">
                            <h2>Menu</h2>
                        </aside>
                        <main className="col-9">
                             <Outlet/>
                        </main>
                        </div>,
                    children : [
                        {
                        path : '',
                        element: 
                        <div>
                        <Home/>
                        
                        </div>
                        },
                        {
                            path : '1/:id',
                            element:
                            <div>
                            <Page1/>
                            <button style={{padding:'8px', margin:'8px'}}>  
                                <Link to={'/home'} >Retour à l'Accueil</Link>
                            </button>
                            </div>,
                            loader:() => fetch('https://jsonplaceholder.typicode.com/posts?_limit=18')
                            },
                        {
                        path : '2/:id',
                        element:
                        <div>
                        <Page2/>
                        <button style={{padding:'8px', margin:'8px'}}>  
                            <Link to={'/home'} >Retour à l'Accueil</Link>
                        </button>
                        </div>
                        },
                        
                    ]
                }
                 
            ]
        },
      

    ])

    function ErrorPage() {
        const error = {message : useRouteError()}
        console.log (error)

        return <>
        <h1> {error.message.data || 'erreur inconnue'} </h1> 
        <br/>
        <h1> Merci de retourner à l'accueil... </h1>
        <button style={{padding:'8px', margin:'8px'}}>  
                    <Link to={'/home'} >Retour à l'Accueil</Link>
        </button>
        </>
    }
      
    function Root() {
        const {state} = useNavigation()
        const navigate = useNavigate();
        const handleLogout = async () => {
            try {
              const userSession = localStorage.getItem('userSession');
              if (userSession) {
                localStorage.removeItem('userSession');
                navigate('/home'); 
              } else {
                console.error('Erreur lors de la déconnexion');
              }
            } catch (error) {
              console.error('Erreur lors de la déconnexion :', error);
            }
          };

          var verseHeader = <></>
          const userSessioState = localStorage.getItem('userSession')
          if (!userSessioState) {
            verseHeader = (<header className='header'>
            <button style={{padding:'8px', margin:'8px'}}> 
                        <Link to={'SignInPage'} >Se connecter</Link>
                    </button>  
        </header>)
          } else if (userSessioState) {
            verseHeader = (<header className='header'>
            <button style={{padding:'8px', margin:'8px'}}> 
                    <Link to={'home/1/1'} >Page1</Link>
                </button> 
                <button style={{padding:'8px', margin:'8px'}}>    
                    <Link to={'home/2/1'} >Page2</Link>
                </button> 
                <button onClick={handleLogout}>Déconnexion</button>
        </header>)
            }
        return <> 
            {verseHeader}
            <div className='container my-4'>
                {state === 'loading' && 'Loading'}
                
                <Outlet/>
            </div>
        </>
        
    }
   

  return (
    <div className="App">
   <RouterProvider router={Router}/>
    </div>
  );
}



export default App;
