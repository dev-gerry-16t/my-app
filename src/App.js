import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home/Home";
import Counter from "./views/Counter/Counter";
import TemperatureTransform from "./views/Temperature/TemperatureTransform";
import ImageCarousel from "./views/Image/ImageCarousel";
import ToDo from "./views/ToDo/ToDoWork";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contador" element={<Counter />} />
        <Route path="/temperatura" element={<TemperatureTransform />} />
        <Route path="/carousel" element={<ImageCarousel />} />
        <Route path="/tareas" element={<ToDo />} />
        {/* <Route path="/nba" element={<DefaultLayout />} />  */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
