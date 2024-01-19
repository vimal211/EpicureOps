import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import EpicureopsLogo from "../../assets/img/logo.png";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import "./Header.scss";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isFavPage = location.pathname === "/favorites";
  const handleLogoClick = () => {
    navigate("/");
  };
  return (
    <div className="header__container">
      <div onClick={handleLogoClick} className="header__logo">
        <img src={EpicureopsLogo} alt="" srcSet="" />
        <span className="header__title">EpicureOps</span>
      </div>
      <div className="header__nav">
        {!isFavPage && (
          <div
            onClick={() => {
              navigate("/favorites");
            }}
            className="header__navlink"
          >
            Favorites
          </div>
        )}
        <div
          onClick={() => {
            navigate("/");
          }}
          className="header__navlink"
        >
          <span>Search</span>
          <SearchOutlinedIcon style={{ color: "#B93010" }} />
        </div>
      </div>
    </div>
  );
}

export default Header;
