import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Todo from './pages/Todo';

// Define a simple context/state for auth status since we don't have Firebase hooked up yet
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check local storage for mock auth state on init
  useEffect(() => {
    const authStatus = localStorage.getItem('mockAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
            <Navigate to="/todo" replace /> : 
            <Login onLogin={() => {
              setIsAuthenticated(true);
              localStorage.setItem('mockAuth', 'true');
            }} />
          } 
        />
        <Route 
          path="/todo" 
          element={
            isAuthenticated ? 
            <Todo onLogout={() => {
              setIsAuthenticated(false);
              localStorage.removeItem('mockAuth');
            }} /> : 
            <Navigate to="/login" replace />
          } 
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
