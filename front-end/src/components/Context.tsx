import React, { useState, createContext, useEffect } from "react";
import { user } from "../../../back-end/src/schemas/users.schema";
import { set } from "mongoose";

//@ts-ignore
const ProductContext = createContext({} as any);
const url: string = process.env.REACT_APP_PRODUCTS_URL || "";

const Context = ({ children }) => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url, {
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
  const [loginOrRegister, setLoginOrRegister] = useState<boolean>();
  const [authModal, setAuthModal] = useState<boolean>(false);
  const [passwordModal, setPasswordModal] = useState<boolean>(false);
  const [registeredUser, setRegisteredUser] = useState<user | null>();
  // ("children", children);
  return (
    <ProductContext.Provider
      value={{
        options,
        setOption,
        products,
        setProduct,
        allProducts,
        searchedProds,
        setSearchedProds,
        loginOrRegister,
        setLoginOrRegister,
        authModal,
        setAuthModal,
        registeredUser,
        setRegisteredUser,
        passwordModal,
        setPasswordModal
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { Context, ProductContext };
