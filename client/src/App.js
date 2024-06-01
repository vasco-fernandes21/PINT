import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './components/auth/loginForm';
import Registar from './components/auth/registarForm';
import RecuperarPasseForm from './components/auth/recuperarPasseForm';
import NovaPasseForm from './components/auth/novaPasseForm';
import Sidebar from './components/home/sidebar';
import Eventos from './views/eventos/eventos';
import CriarEvento from './components/eventos/eventosCriar';
import EstabelecimentoList from './components/estabelecimento/estabelecimentoList';
import CriarEstabelecimento from './components/estabelecimento/estabelecimentoCriar';

const AuthenticatedLayout = () => (
  <>
    <Sidebar />
    <div style={{padding: '30px' }}> 
      <Outlet />
    </div>
  </>
);

const UnauthenticatedLayout = () => (
  <div>
    <Outlet />
  </div>
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };  

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route element={<UnauthenticatedLayout />}>
          <Route path="login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="registar" element={<Registar />} />
          <Route path="recuperar-passe" element={<RecuperarPasseForm />} />
          <Route path="reset-passe" element={<NovaPasseForm />} />
        </Route>

        <Route path="/*" element={isAuthenticated ? <AuthenticatedLayout /> : <Navigate to="/login" replace />}>
          <Route path="eventos" element={<Eventos />} />
            <Route path="eventos/criar" element={<CriarEvento />} />
         </Route>
         <Route path="/*" element={isAuthenticated ? <AuthenticatedLayout /> : <Navigate to="/login" replace />}>
          <Route path="estabelecimentos" element={<EstabelecimentoList />} />
            <Route path="estabelecimentos/criar" element={<CriarEstabelecimento />} />
         </Route>
        
        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;