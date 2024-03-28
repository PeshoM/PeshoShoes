import { useState, createContext, useEffect, useRef } from "react";
import React from 'react';
//@ts-ignore
const ProductContext = createContext({} as Product);

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

  interface ColorVariation {
    images: string[];
    price: number;
    quantity: number[];
    sizes: number[];
    color: string;
    rating: number[];
  }

  interface Product {
    title: string;
    description: string;
    colorVariations: ColorVariation[];
  }
  const [options, setOption] = useState<Product[]>([]);
  const [products, setProduct] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [searchedProds, setSearchedProds] = useState<Product[]>([]);
  const [currProd, setCurrProd] = useState<Product>(); 
  // ("children", children);
  return (
    <ProductContext.Provider value={{ options, setOption, products, setProduct, allProducts, searchedProds, setSearchedProds }}>
      {children}
    </ProductContext.Provider>
  );
};

export { Context, ProductContext };