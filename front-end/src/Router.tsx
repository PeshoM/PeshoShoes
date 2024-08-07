import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import CreateProd from "./components/ProductCreation/CreateProd.tsx";
import DisplayProd from "./components/DisplayProducts/DisplayProd.tsx";
import NotFound from "./components/NotFound.tsx";
import { Context } from "./components/Context.tsx";
import Product from "./components/OpenedProductPage/Product.tsx";
// import PaymentFail from "./components/PaymentPages/PaymentFail.tsx";
import PaymentSuccess from "./components/PaymentPages/PaymentSuccess.tsx";
import Cart from "./components/PaymentPages/Cart.tsx";
import { Context1 } from "./components/Context/FilterContext.tsx";
import PasswordReset from "./components/PasswordReset.tsx";

function App() {
  return (
    <BrowserRouter>
      <Context1>
        <Context>
          <Routes>
            <Route path="/" element={<DisplayProd />}></Route>
            <Route path="/CreateProd" element={<CreateProd />}></Route>
            <Route path="/Product" element={<Product />}></Route>
            {/* <Route path="/PaymentFail" element={<PaymentFail />}></Route> */}
            <Route path="/PaymentSuccess" element={<PaymentSuccess />}></Route>
            <Route path="/Cart" element={<Cart />}></Route>
            <Route path="/password-reset" element={<PasswordReset />}></Route>
          </Routes>
        </Context>
      </Context1>
      <Routes>
        <Route path="/NotFound" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
