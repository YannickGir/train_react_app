import logo from './logo.svg';
import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Home from './pages/Home';




function App() {

    const Router = createBrowserRouter ([
        {
            path : '/',
            element:
            <div>
                <Root/>
            </div>,
            children : [
                {
                    path:'home',
                    element: 
                    <div>
                        <Home/>
                    </div>
                },
                 {
                path : 'Page1/:id',
                element: 
                <div>
                <Page1/>
                <button style={{padding:'8px', margin:'8px'}}>  
                    <Link to={'/home'} >Retour à l'Accueil</Link>
                </button>
                </div>
                },
                {
                path : 'Page2/:id',
                element:
                <div>
                <Page2/>
                <button style={{padding:'8px', margin:'8px'}}>  
                    <Link to={'/home'} >Retour à l'Accueil</Link>
                </button>
                </div>
                }
            ]
        },
       

    ])
      
    function Root() {
        return <> 
            <header>
                <button style={{padding:'8px', margin:'8px'}}> 
                        <Link to={'/Page1/:id'} >Page1</Link>
                    </button> 
                    <button style={{padding:'8px', margin:'8px'}}>    
                        <Link to={'/Page2/:id'} >Page2</Link>
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
