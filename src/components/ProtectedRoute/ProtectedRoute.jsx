import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const status = useSelector((state) => state.auth.status);

  if (status === 'Unauthorized' || status === undefined) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;