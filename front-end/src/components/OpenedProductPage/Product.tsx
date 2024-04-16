import React from "react";
import { useEffect, useState, useRef } from "react";
import Navigation from "../NavigationBar/Navigation.tsx";
import Footer from "../Footer.tsx";
import "../../styles/product.css";
import { useSearchParams } from "react-router-dom";
import { useProduct } from "./useProduct.ts";
import Dropdown from "../Dropdown.tsx";

const Product: React.FC = () => {
  const { product, setProduct, handleImageClick } = useProduct();
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const color = searchParams.get("color");

  const [sizesSet, setSizesSet] = useState<Set<number>>(new Set<number>());
  interface ColorVariation {
    images: string[];
    price: number;
    quantity: number[];
    sizes: number[];
    color: string;
    rating: number[];
  }
  interface Prod {
    title: string;
    description: string;
    colorVariations: ColorVariation[];
    season: string;
  }
  let leaveForNow: undefined = undefined;
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [imageIdx, setImageIdx] = useState<number>(-1);
  const [zoomed, setZoomed] = useState(false);
  const imagepath: string = process.env.REACT_APP_PRODUCT_IMAGES_PATH || "";

  useEffect(() => {
    let fetchProduct = async () => {
      const url: string = process.env.REACT_APP_PRODUCT_FETCH_PRODUCT_URL || "";
      console.log(searchParams.toString());
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          color,
        }),
      }).then((res) => {
        return res.json();
      });
      setProduct(response.product);
      setSizesSet(new Set<number>(response.product.colorVariations[0].sizes));
    };
    fetchProduct();
  }, []);

  useEffect(() => {
    if (isClicked) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "15px";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    };
  }, [isClicked]);

  return (
    <div>
      {isClicked && (
        <div className="picture-modal-background">
          <div
            className="picture-modal-btn"
            onClick={() => {
              imageIdx > 0 ? setImageIdx(imageIdx - 1) : setImageIdx(5);
              setZoomed(false);
            }}
          >
            {"<"}
          </div>
          <img
            src={imagepath + product?.colorVariations[0].images[imageIdx]}
            alt="Your Image"
            className={`modal-picture ${zoomed ? "zoomed" : ""}`}
            onClick={() => setZoomed(!zoomed)}
          />
          <div
            className="picture-modal-btn"
            onClick={() => {
              imageIdx <= 4 ? setImageIdx(imageIdx + 1) : setImageIdx(0);
              setZoomed(false);
            }}
          >
            {">"}
          </div>
          <div
            className="picture-modal-cancel"
            onClick={() => setIsClicked(false)}
          >
            X
          </div>
          <div className="picture-modal-info">
            {imageIdx + 1}/{product?.colorVariations[0].images.length}
          </div>
        </div>
      )}
      <Navigation />
      <div className="product-info-and-options">
        <div className="product-pictures">
          <div className="grid-container">
            {product &&
              product.colorVariations[0].images.map((image, index) => (
                <img
                  className={"product-images pic" + index}
                  src={imagepath + image}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    setIsClicked(true);
                    setImageIdx(index);
                  }}
                />
              ))}
          </div>
        </div>
        <div className="product-options">
          <div className="product-title">{product?.title}</div>
          <div className="product-color">
            {product?.colorVariations[0].color}
          </div>
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
          <div className="product-price">
            {product?.colorVariations[0].price}лв.
          </div>
          <div className="product-sizes">
            <div className="sizes-div">
              <p className="sizes-titles">Avaiable sizes</p>
              <div
                tabIndex={0}
                className="collapse collapse-arrow border border-base-250 bg-base-200"
              >
                <Dropdown></Dropdown>
              </div>
            </div>
          </div>
          <p className="color-options">
            {product?.colorVariations.length} Color Options
          </p>
          <div className="shoe-variations-container">
            {product?.colorVariations.map((colorVar, index: number) => (
              <div
                className={"pic-choices pic-option" + index}
                onClick={() => {
                  handleImageClick(index);
                }}
              >
                <img
                  className="product-variation-images"
                  alt=""
                  src={imagepath + colorVar.images[2]}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Product;
