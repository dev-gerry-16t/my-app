import React, { createElement } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home/Home";
import RoutesPages from "./constants/pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {RoutesPages.map((row, ix) => {
          return (
            <Route
              key={`route-${ix}`}
              path={`/${row.path}`}
              element={createElement(row.component, {})}
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
