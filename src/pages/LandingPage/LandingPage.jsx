import React from "react";
import "./LandingPage.scss";
import SearchIcon from '@mui/icons-material/Search';

function LandingPage() {
  return (
    <div className="landingpage__layout">
      <div className="landingpage__header">
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
          <input id="recipeSearch" placeholder="Search recipe" type="text" />
          <button className="landingpage__content-search-btn"><SearchIcon style={{color:"#fff", fontSize: "1.5rem"}} /></button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
