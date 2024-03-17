import { useState, createContext, useEffect, useRef } from "react";
import React from 'react';
//@ts-ignore
const ProductContext = createContext();

const Context = ({ children }) => {

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/products", {
        method: "GET",
      }).then((res) => {
        return res.json();
      });
      setAllProducts(response.products);
      // console.log(response);
    };

    fetchData();
  }, []);

  const [options, setOption] = useState([]);
  const [products, setProduct] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [searchedProds, setSearchedProds] = useState([]);
  const [currProd, setCurrProd] = useState(); 
  // ("children", children);
  return (
    <ProductContext.Provider value={{ options, setOption, products, setProduct, allProducts, searchedProds, setSearchedProds }}>
      {children}
    </ProductContext.Provider>
  );
};

export { Context, ProductContext };