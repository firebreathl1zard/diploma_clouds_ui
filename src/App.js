import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { WorkflowPages } from './pages/Workflow';
import { AuthorizationPages } from './pages/Authorization';
import ConsolePage from './pages/Console';
import { useNavigate } from 'react-router-dom';
import SSEComponent from './components/SSEComponent/SSEComponent';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  const [data, setData] = useState(); 
  const status = useSelector((state) => state.auth.status);
  console.log(status);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthorizationPages setData={setData} />} />
        <Route 
          path="/workflow" 
          element={
            <ProtectedRoute data={data}>
              <WorkflowPages />
              {/* <SSEComponent /> */}
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/console" 
          element={
            status === 'Login successful' ? (
              <ConsolePage /> 
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route
          path="*"
          element={
            status === 'Login successful' ? (
              <Navigate to="/workflow" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;