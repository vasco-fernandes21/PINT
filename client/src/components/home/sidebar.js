import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaCalendarAlt, FaBell, FaHome, FaBars } from "react-icons/fa";
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

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: "#1D324F", boxShadow: "none", height: "64px" }}>
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <img src={logo} alt="Logo" style={{ width: "150px", height: "100%", objectFit: "contain" }} />
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
          <FaBars />
        </IconButton>
      </Toolbar>
    </AppBar>
      <Drawer anchor="left" open={open} onClose={handleDrawerClose} style={{ boxShadow: 'none' }}>
        <div className="menu" style={{ width: "300px", backgroundColor: "#1D324F", height: "100vh", color: "white", padding:"5%" }}>
          <img src={logo} alt="Logo" className="logo img-fluid mx-auto d-block mb-3" />
          <NavLink className={location.pathname === "/" ? "menu-item text-white mb-4 d-block text-start active" : "menu-item text-white mb-4 d-block text-start"} to="/" onClick={handleDrawerClose}>
            <FaHome className='icone' /> Início
          </NavLink>
          <NavLink className={location.pathname === "/about" ? "menu-item text-white mb-4 d-block text-start active" : "menu-item text-white mb-4 d-block text-start"} to="/about" onClick={handleDrawerClose}>
            <FaCalendarAlt className='icone' /> Calendário
          </NavLink>
          <NavLink className={location.pathname === "/services" ? "menu-item text-white mb-4 d-block text-start active" : "menu-item text-white mb-4 d-block text-start"} to="/services" onClick={handleDrawerClose}>
            <BsBuildings className='icone' /> Estabelecimentos
          </NavLink>
          <NavLink className={location.pathname === "/eventos" ? "menu-item text-white mb-4 d-block text-start active" : "menu-item text-white mb-4 d-block text-start"} to="/eventos" onClick={handleDrawerClose}>
            <MdEvent className='icone' /> Eventos
          </NavLink>
          <NavLink className={location.pathname === "/contact" ? "menu-item text-white mb-4 d-block text-start active" : "menu-item text-white mb-4 d-block text-start"} to="/contact" onClick={handleDrawerClose}>
            <FaBell className='icone' /> Notificações
          </NavLink>
        </div>
      </Drawer>
    </>
  );
};

export default Sidebar;