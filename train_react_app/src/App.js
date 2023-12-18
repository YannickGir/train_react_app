import logo from './logo.svg';
import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, createBrowserRouter, RouterProvider } from 'react-router-dom';





function App() {

    const Router = createBrowserRouter ([
        {
            path : '/',
            element:
            <div>
                <h2>Accueil</h2>
                <button style={{padding:'8px', margin:'8px'}}> 
                    <Link to={'/Page1'} >Page1</Link>
                </button> 
                <button style={{padding:'8px', margin:'8px'}}>    
                    <Link to={'/Page2'} >Page2</Link>
                </button> 
            </div>
        },
        {
            path : '/Page1',
            element:
            <div>
                <h2>Page 1</h2>
                <button style={{padding:'8px', margin:'8px'}}>  
                    <Link to={'/'} >Retour à l'Accueil</Link>
                </button>
            </div>
        },
        {
            path : '/Page2',
            element:
            <div>
            <h2>Page 2</h2>
            <button style={{padding:'8px', margin:'8px'}}>  
                <Link to={'/'} >Retour à l'Accueil</Link>
            </button>
        </div>
        }

    ])
      
  return (
    <div className="App">
   <RouterProvider router={Router}/>
    </div>
  );
}

export default App;
