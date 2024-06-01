import React, { useState } from 'react';
import { NavLink, useLocation} from 'react-router-dom';
import { FaCalendarAlt, FaBell, FaHome, FaBars } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { BsBuildings } from "react-icons/bs";
import { MdEvent } from "react-icons/md";
import { Drawer, IconButton, AppBar, Toolbar } from '@mui/material';
import logo from '../../assets/softinsabranco.svg';
import './sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div>
      <div style={{ position: 'fixed', left: 0, top: 0, height: '100vh', width: '5px' }} onMouseEnter={handleDrawerOpen} />
      <AppBar position="static" style={{ backgroundColor: "#1D324F", boxShadow: "none", height: "64px" }}>
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <img src={logo} alt="Logo" style={{ width: "150px", height: "100%", objectFit: "contain" }} />
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
            <FaBars />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={handleDrawerClose} style={{ boxShadow: 'none' }}>
        <div className="menu" style={{ width: "300px", backgroundColor: "#1D324F", height: "100vh", color: "white", padding: "5%" }}>
          <img src={logo} alt="Logo" className="logo img-fluid mx-auto d-block mb-3" />
          <NavLink className={location.pathname === "/" ? "menu-item text-white mb-4 d-block text-start active" : "menu-item text-white mb-4 d-block text-start"} to="/" onClick={handleDrawerClose}>
            <FaHome className='icone' /> Início
          </NavLink>
          <NavLink className={location.pathname === "/about" ? "menu-item text-white mb-4 d-block text-start active" : "menu-item text-white mb-4 d-block text-start"} to="/about" onClick={handleDrawerClose}>
            <FaCalendarAlt className='icone' /> Calendário
          </NavLink>
          <NavLink className={location.pathname === "/estabelecimentos" ? "menu-item text-white mb-4 d-block text-start active" : "menu-item text-white mb-4 d-block text-start"} to="/estabelecimentos" onClick={handleDrawerClose}>
            <BsBuildings className='icone' /> Estabelecimentos
          </NavLink>
          <NavLink className={location.pathname === "/eventos" ? "menu-item text-white mb-4 d-block text-start active" : "menu-item text-white mb-4 d-block text-start"} to="/eventos" onClick={handleDrawerClose}>
            <MdEvent className='icone' /> Eventos
          </NavLink>
          <NavLink className={location.pathname === "/contact" ? "menu-item text-white mb-4 d-block text-start active" : "menu-item text-white mb-4 d-block text-start"} to="/contact" onClick={handleDrawerClose}>
            <FaBell className='icone' /> Notificações
          </NavLink>
          <div className="menu-item text-white mb-4 d-block text-start logout-button" onClick={handleLogout} role="button">
            <CiLogout className='icone' /> Logout
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Sidebar;