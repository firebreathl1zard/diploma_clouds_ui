import React from 'react';
import './pp.css';

import "bootstrap/dist/css/bootstrap.min.css"; 
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Routes, Route , BrowserRouter  } from 'react-router-dom';
import  { Avtoriz }  from './Components/Avtoriz';
import  { Glavnai }   from './Components/Glavnai';

function App() {
  return (
    <>
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Avtoriz/>} />
        <Route path='/glavnai' element={<Glavnai/>} />
        
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
