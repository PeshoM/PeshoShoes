import React from "react";
import { useEffect, useState, useRef } from "react";
import Navigation from "./Navigation.tsx";
import Footer from "./Footer.tsx";
import "../styles/product.css";
import { useSearchParams } from "react-router-dom";

const Product = () => {
  const [searchParams] = useSearchParams();
  const [product, setProduct] = useState<Prod>();
  const title = searchParams.get("title");
  interface Prod {
    title: string;
    description: string;
    images: string[];
    price: number;
    sizes: number[];
    color: string[];
    season: string;
  };
  let leaveForNow: undefined = undefined;
  const selectedSizes = useRef<number[]>();

  useEffect(() => {
    let fetchProduct = async () => {
      let response = await fetch("http://localhost:8000/fetchProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
        }),
      }).then((res) => {
        return res.json();
      });
      setProduct(response.product);
    };
    fetchProduct();
  }, []);

  return (
    <div>
      <Navigation />
      <div className="product-info-and-options">
        <div className="product-pictures">
          <div className="grid-container">
            {product &&
              product.images.map((image, index) => (
                <img
                  className={"product-images pic" + index}
                  src={"http://localhost:8000/uploads/" + image}
                />
              ))}
          </div>
        </div>
        <div className="product-options">
          <div className="product-title">{product?.title}</div>
          <div className="product-color">{product?.color}</div>
          {/* add review displays after the whole this is done */}
          {leaveForNow && (
            <div className="rating rating-md">
              <input
                type="radio"
                name="rating-7"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-7"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-7"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-7"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-7"
                className="mask mask-star-2 bg-orange-400"
              />
            </div>
          )}
          <div className="product-price">{product?.price}лв.</div>
          <div className="product-sizes">
            <div className="sizes-div">
              <p>Avaiable sizes</p>
              {/**@ts-ignore */}
              <select ref={selectedSizes}>
              <option value="" disabled hidden selected>
                Sizes
              </option>
              {product?.sizes.map((size, index) => (
                <option value={size}>{size}</option>
              ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Product;
