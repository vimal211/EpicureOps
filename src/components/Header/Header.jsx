import React from "react";
import { useNavigate } from 'react-router-dom'
import EpicureopsLogo from '../../assets/img/logo.png'
import "./Header.scss";

function Header() {
    const navigate = useNavigate();
    const handleLogoClick = () => {
        navigate('/')
    }
  return (
    <div onClick={handleLogoClick} className="header__container">
      <img src={EpicureopsLogo} alt="" srcSet="" />
      <span className="header__title">EpicureOps</span>
    </div>
  );
}

export default Header;
