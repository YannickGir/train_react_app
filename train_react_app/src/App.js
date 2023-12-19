import logo from './logo.svg';
import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, createBrowserRouter, RouterProvider, Outlet, useRouteError } from 'react-router-dom';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Home from './pages/Home';




function App() {

    const Router = createBrowserRouter ([
        {
            path : '/',
            element:
                <Root/>,
            errorElement: <ErrorPage/>,
            children : [
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
                        <button style={{padding:'8px', margin:'8px'}}>  
                            <Link to={'/home'} >Retour à l'Accueil</Link>
                        </button>
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
                        }
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
        return <> 
            <header>
                <button style={{padding:'8px', margin:'8px'}}> 
                        <Link to={'home/1/1'} >Page1</Link>
                    </button> 
                    <button style={{padding:'8px', margin:'8px'}}>    
                        <Link to={'home/2/1'} >Page2</Link>
                    </button> 
            </header>
            <div>
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
