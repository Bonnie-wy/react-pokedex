import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import PokemonPage from "./pages/PokemonPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/pokemon/:name" element={<PokemonPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
