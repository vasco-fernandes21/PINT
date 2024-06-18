import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './components/auth/loginForm';
import Registar from './components/auth/registarForm';
import RecuperarPasseForm from './components/auth/recuperarPasseForm';
import NovaPasseForm from './components/auth/novaPasseForm';
import Sidebar from './components/home/sidebar';
import Eventos from './views/eventos/eventos';
import CriarEvento from './components/eventos/eventoCriar';
import EstabelecimentoList from './components/estabelecimento/estabelecimentoList';
import CriarEstabelecimento from './components/estabelecimento/estabelecimentoCriar';
import EstabelecimentoPage from './components/estabelecimento/estabelecimentoPage';
import ListaUtilizadores from './components/utilizador/utilizadorList';
import SelecionarPosto from './components/posto/SelecionarPostoForm';
import EditarEstabelecimento from './components/estabelecimento/estabelecimentoEdit';
import CreateAreaForm from './components/area/areaCriar';
import UtilizadorPerfil from './components/utilizador/utilizadorPerfil';
import Calendario from './components/calendario/calendario';
import EventoPage from './components/eventos/eventoPage';
import Notificacoes from './components/notificacao/notificacaoPage';

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
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token') || !!sessionStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token') || !!sessionStorage.getItem('token'));
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
          <Route path="posto" element={<SelecionarPosto />} />
        </Route>

        <Route path="/*" element={isAuthenticated ? <AuthenticatedLayout /> : <Navigate to="/login" replace />}>
          <Route path="eventos" element={<Eventos />} />
            <Route path="eventos/criar" element={<CriarEvento />} />
            <Route path="eventos/:id" element={<EventoPage />} />
          <Route path="estabelecimentos" element={<EstabelecimentoList />} />
            <Route path="estabelecimentos/criar" element={<CriarEstabelecimento />} />
            <Route path="estabelecimentos/:id" element={<EstabelecimentoPage/>} />
            <Route path="estabelecimentos/:id/editar" element={<EditarEstabelecimento />} />
          <Route path="utilizadores" element={<ListaUtilizadores />} />
          <Route path="area" element={<CreateAreaForm />} />
          <Route path="utilizador" element={<UtilizadorPerfil />} />
          <Route path="calendario" element={<Calendario />} />
          <Route path="notificacoes" element={<Notificacoes />} />
         </Route>
        
        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;