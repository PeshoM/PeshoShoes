import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import Main from "./components/Main.tsx";
import CreateProd from "./components/CreateProd.tsx";
import DisplayProd from "./components/DisplayProd.tsx";
import Register from "./components/Register.tsx";
import NotFound from "./components/NotFound.tsx";
import Login from "./components/Login.tsx";
import { Context }from "./components/Context.tsx";
import Product from "./components/Product.tsx";

function App() {
  return (
    <BrowserRouter>
      <Context>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/Register" element={<Register />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/CreateProd" element={<CreateProd />}></Route>
          <Route path="/DisplayProd" element={<DisplayProd />}></Route>
          <Route path="/Product" element={<Product />}></Route>
        </Routes>
      </Context>
      <Routes>
        <Route path="/NotFound" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
