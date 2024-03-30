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
  const color = searchParams.get("color");
  let sizesArr: number[] = [
    34, 34.5, 35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41,
    41.5, 42, 42.5, 43, 43.5, 44, 44.5, 45, 45.5, 46, 46.5, 47, 47.5, 48, 48.5,
    49,
  ];
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
  const selectedSizes = useRef<number[]>();

  useEffect(() => {
    let fetchProduct = async () => {
      console.log(searchParams.toString());
      let response = await fetch("http://localhost:8000/fetchProduct", {
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

  const handleImageClick = () => {
    
  }

  return (
    <div>
      <Navigation />
      <div className="product-info-and-options">
        <div className="product-pictures">
          <div className="grid-container">
            {product &&
              product.colorVariations[0].images.map((image, index) => (
                <img
                  className={"product-images pic" + index}
                  src={"http://localhost:8000/uploads/" + image}
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
                <div className="collapse-title text-xl font-medium">Sizes</div>
                <div className="collapse-content">
                  {sizesArr.map((size, index) => (
                    <>
                      {sizesSet.has(size) ? (
                        <div className="paragraph-container">
                          <p className="sizes-paragraph">
                            <div className="sizes-nums">{size}</div>
                          </p>
                        </div>
                      ) : (
                        <div className="paragraph-container paragraph-container-out-of-stock">
                          <p className="sizes-paragraph sizes-out-of-stock">
                            <div className="sizes-nums">{size}</div>{" "}
                            <span className="sold-out">Sold out</span>
                          </p>
                        </div>
                      )}
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <p className="color-options">{product?.colorVariations.length} Color Options</p>
         <div className="shoe-variations-container">
          {product?.colorVariations.map((colorVar, index: number) => (
            <div className={"pic-choices pic-option"+index}>
              <img className="product-variation-images" alt="" src={"http://localhost:8000/uploads/"+colorVar.images[2]}/>
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
