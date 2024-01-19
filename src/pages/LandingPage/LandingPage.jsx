import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import "./LandingPage.scss";
import SearchIcon from '@mui/icons-material/Search';
import EpicureopsLogo from '../../assets/img/logo.png'

function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showErrMsg, setShowErrMsg] = useState(false);
  const navigate = useNavigate();

  const handleBtnOnClick = () => {
    if(searchQuery.length !== 0) {
      navigate(`/search/${searchQuery}`);
      setSearchQuery('')
    } else {
      setShowErrMsg(true);
      let timeoutId = setTimeout(() => {
        clearTimeout(timeoutId);
        setShowErrMsg(false);
      }, 2000)
    }
  }

  const handleOnKeyUp = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      handleBtnOnClick()  
    }
  }
  
  return (
    <div className="landingpage__layout">
      <div className="landingpage__header">
        <img src={EpicureopsLogo} alt="" srcSet="" />
        <span className="landingpage__header-title">EpicureOps</span>
      </div>
      <div className="landingpage__content">
        <div>Having a hard time cooking?</div>
        <div>Find the best recipies with us</div>
        <div>
          Explore through our wide range of recipies from different categories.
          Continental to Chinese? We have it all. Just enter your keyword and
          go.
        </div>
        <div className="landingpage__content-search">
          <input onKeyUp={handleOnKeyUp} id="recipeSearch" placeholder="Search recipe" value={searchQuery} onChange={(e) => setSearchQuery(e.currentTarget.value)} type="text" />
          <button onClick={handleBtnOnClick} className="landingpage__content-search-btn"><SearchIcon style={{color:"#fff", fontSize: "1.5rem"}} /></button>
        </div>
        {showErrMsg && <div className="landingpage__content-err">*Enter a valid recipe name</div>}
      </div>
    </div>
  );
}

export default LandingPage;
