import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePages } from './pages/Home';
import {AuthorizationPages} from './pages/Authorization';





function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthorizationPages />} />
        <Route path="/home" element={<HomePages />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;