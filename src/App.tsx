import { Route, Routes } from "react-router-dom";
import HomePage from './pages/homePage'
import Playlist from './pages/playlist'
import NavBar from "./components/navBar";

function App() {
  
  return (
    <div>
      <NavBar />
      <Routes>
          <Route element={<HomePage />} path="/" />
          <Route element={<Playlist />} path="/playlist" />
      </Routes>
    </div>
  );
}

export default App;
