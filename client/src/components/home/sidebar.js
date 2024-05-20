import React from 'react';
import { NavLink} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './sidebar.css';
import logo from '../../assets/softinsabranco.svg';
import { FaCalendarAlt, FaBell, FaHome } from "react-icons/fa";
import { BsBuildings } from "react-icons/bs";
import { MdEvent } from "react-icons/md";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar d-flex flex-column p-3 align-items-center" style={{ maxWidth: "300px", backgroundColor: "#1D324F", height: "100vh"}}>
      <img src={logo} alt="Logo" className="logo img-fluid mx-auto d-block mb-3"/>
      <div className="menu" style={{width: "100%"}}>
        <NavLink className={location.pathname === "/" ? "menu-item text-white mb-4 d-block text-start active" : "menu-item text-white mb-4 d-block text-start"} to="/">
          <FaHome className='icone'/> Início
        </NavLink>
        <NavLink className={location.pathname === "/about" ? "menu-item text-white mb-4 d-block text-start active" : "menu-item text-white mb-4 d-block text-start"} to="/about">
          <FaCalendarAlt className='icone' /> Calendário
        </NavLink>
        <NavLink className={location.pathname === "/services" ? "menu-item text-white mb-4 d-block text-start active" : "menu-item text-white mb-4 d-block text-start"} to="/services">
          <BsBuildings className='icone'/> Estabelecimentos
        </NavLink>
        <NavLink className={location.pathname === "/eventos" ? "menu-item text-white mb-4 d-block text-start active" : "menu-item text-white mb-4 d-block text-start"} to="/eventos">
          <MdEvent className='icone'/> Eventos
        </NavLink>
        <NavLink className={location.pathname === "/contact" ? "menu-item text-white mb-4 d-block text-start active" : "menu-item text-white mb-4 d-block text-start"} to="/contact">
          <FaBell className='icone'/> Notificações
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;