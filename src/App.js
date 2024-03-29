import { Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import Header from "./components/Header/Header";
import RecipeResults from "./pages/RecipeResults/RecipeResults";
import RecipeView from "./pages/RecipeView/RecipeView";
import FavoritePage from "./pages/FavoritePage/FavoritePage";
import "./App.scss";

function App() {
  const location = useLocation();
  const canShowHeader = location.pathname !== "/";

  return (
    <div className="App">
      {canShowHeader && <Header />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/search/:name" element={<RecipeResults />} />
        <Route path="/recipe/view" element={<RecipeView />} />
        <Route path="/favorites" element={<FavoritePage />} />
      </Routes>
    </div>
  );
}

export default App;
