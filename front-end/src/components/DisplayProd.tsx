import "../styles/displayprod.css";
import { useEffect, useState, useContext, useRef } from "react";
import React from 'react';
import { useNavigate } from "react-router-dom";
import Footer from "./Footer.tsx";
import Navigation from "./Navigation.tsx";
import { ProductContext } from "./Context.tsx";

const DisplayProd = () => {
  //@ts-ignore
  const { options, setOption, products, setProduct, searchedProds, setSearchedProds } =
    useContext(ProductContext);
  const navigate = useNavigate();
  const [activeTabs, setActiveTabs] = useState([false, false, false, false, false]);
  const [startValue, setStartValue] = useState(0);
  const [endValue, setEndValue] = useState(100);
  const [range, setRange] = useState([null, null]);
  const pickedSizes = useRef<number[]>([]);
  const searchedProducts = useRef([]);
  let colorsArr = [
    { color: "Beige", class: "beigeclass" },
    { color: "Black", class: "blackclass" },
    { color: "Blue", class: "blueclass" },
    { color: "Brown", class: "brownclass" },
    { color: "Gray", class: "grayclass" },
    { color: "Green", class: "greenclass" },
    { color: "Multicolour", class: "multicolourclass" },
    { color: "Orange", class: "orangeclass" },
    { color: "Pink", class: "pinkclass" },
    { color: "Purple", class: "purpleclass" },
    { color: "Red", class: "redclass" },
    { color: "White", class: "whiteclass" },
    { color: "Yellow", class: "yellowclass" },
  ];
  const [selectedColor, setSelectedColor] = useState(null);
  const pickedColors = useRef<string[]>([]);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const pickedSeasons = useRef<string[]>([]);

  const handleStartChange = (e) => {
    const newStartValue = parseInt(e.target.value, 10);
    if (newStartValue <= endValue) {
      setStartValue(newStartValue);
    }
  };

  const handleEndChange = (e) => {
    const newEndValue = parseInt(e.target.value, 10);
    if (newEndValue >= startValue) {
      setEndValue(newEndValue);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/products", {
        method: "GET",
      }).then((res) => {
        return res.json();
      });
      if (products.length == 0) setProduct(response.products);
      if (searchedProds.length == 0) setSearchedProds(response.products);
      setRange((prev) => {
        prev = [...range];
        prev[0] = response.minVal;
        prev[1] = response.maxVal;
        console.log(prev[0], prev[1], "datatata");
        return prev;
      });
      setStartValue(response.minVal);
      setEndValue(response.maxVal);
      console.log("min and max for range", range);
      console.log(response);
    }; // asd asddsa asd

    fetchData();
  }, []);

  const handleTabClick = (idx) => {
    setActiveTabs((prevActiveTabs) => {
      prevActiveTabs = [...activeTabs];
      prevActiveTabs[idx] = !prevActiveTabs[idx];
      return prevActiveTabs;
    });
  };

  const handleFiltering = async () => {
    console.log(startValue, endValue, pickedSizes, selectedColor, searchedProducts.current);
    let response = await fetch("http://localhost:8000/filteredData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        minPrice: startValue,
        maxPrice: endValue,
        pickedSizes: pickedSizes.current,
        pickedColor: pickedColors.current,
        pickedSeason: pickedSeasons.current,
        products: searchedProds
      }),
    }).then((res) => {
      return res.json();
    });
    setProduct(response.filteredData);
  };

  const handleSizeChanges = (size) => {
    for (let i = 0; i < pickedSizes.current.length; i++) {
      if (pickedSizes.current[i] == size)
        return pickedSizes.current.splice(i, 1);
    }
    pickedSizes.current = [...pickedSizes.current, size];
    pickedSizes.current.sort();
    console.log("sizes picked", pickedSizes.current);
  };

  const handleColorChange = (color) => {
    for (let i = 0; i < pickedColors.current.length; i++) {
      if (pickedColors.current[i] == color)
        return pickedColors.current.splice(i, 1);
    }
    pickedColors.current = [...pickedColors.current, color];
    pickedColors.current.sort();
    console.log("colors picked", pickedColors.current);
  };

  const handleSeasonChange = (season) => {
    for (let i = 0; i < pickedSeasons.current.length; i++) {
      if (pickedSeasons.current[i] == season)
        return pickedSeasons.current.splice(i, 1);
    }
    pickedSeasons.current = [...pickedSeasons.current, season];
    pickedSeasons.current.sort();
    console.log("seasons picked", pickedSeasons.current);
  }
  const handleClickProduct = (prod) => {
    const queryParams = { title: prod.title };
    const searchParams = new URLSearchParams(queryParams);
    const url = `/Product?${searchParams.toString()}`;
    window.location.href = url;
  }
  return (
    <div>
      <div className="bigDiv">
        <Navigation />
        <div className="midPart">
          <div className="midPart-left">
            <div
              className="filtering-options"
              onClick={() => {
                handleTabClick(0);
                console.log(activeTabs);
              }}
            >
              SIZE
            </div>
            {activeTabs[0] && (
              <div className="sizes-menu">
                <p>EUROPEAN</p>
                <div>
                  {[
                    34, 34.5, 35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5,
                    40, 40.5, 41, 41.5, 42, 42.5, 43, 43.5, 44, 44.5, 45, 45.5,
                    46, 46.5, 47, 47.5, 48, 48.5, 49,
                  ].map((size, index) => (
                    <div className="single-size-option">
                      <input
                        type="checkbox"
                        defaultChecked={false}
                        className=""
                        onChange={() => {
                          handleSizeChanges(size);
                          handleFiltering();
                        }}
                      />
                      {size}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="filtering-options">PRICE</div>
            <div className="double-range-slider">
              <input
                type="range"
                //@ts-ignore
                min={range[0]}
                //@ts-ignore
                max={range[1]}
                value={startValue}
                onChange={handleStartChange}
                onMouseUp={handleFiltering}
              />
              <input
                type="range"
                //@ts-ignore
                min={range[0]}
                //@ts-ignore
                max={range[1]}
                value={endValue}
                onChange={handleEndChange}
                onMouseUp={handleFiltering}
              />
              <span>
                Start Value: {startValue} - End Value: {endValue}
              </span>
            </div>
            <div
              className="filtering-options"
              onClick={() => {
                handleTabClick(1);
              }}
            >
              COLOUR
            </div>
            {activeTabs[1] && (
              <div className="colors-main">
                <div className="colors-div-display">
                  <p>Shoe colour</p>
                  <div className="colors-subdiv-display">
                    {colorsArr.map((color, index) => (
                      <div className="colors-choices-display">
                        <input
                          type="checkbox"
                          defaultChecked={false}
                          name="colors"
                          value={color.color}
                          // checked={selectedColor === color.color}
                          onChange={() => {
                            handleColorChange(color.color);
                            handleFiltering();
                          }}
                        />
                        {color.color}
                        <div className={color.class}></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div
              className="filtering-options"
              onClick={() => {
                handleTabClick(2);
              }}
            >
              SEASON
            </div>
            {activeTabs[2] && (
              <div className="seasons-main">
                <div className="seasons-div-display">
                  <div className="seasons-subdiv-display">
                    {["spring", "summer", "autumn", "winter"].map(
                      (season, index) => (
                        <div className="seasons-choices-display">
                          <input
                            type="checkbox"
                            defaultChecked={false}
                            className=""
                            onChange={() => {
                              handleSeasonChange(season);
                              handleFiltering();
                            }}
                          />
                          <div>{season}</div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
            <div
              className="filtering-options"
              onClick={() => {
                handleTabClick(3);
              }}
            >
              SALE
            </div>
            {activeTabs[3] && <div>salds</div>}
            <div
              className="filtering-options"
              onClick={() => {
                handleTabClick(4);
              }}
            >
              CATEGORIES
            </div>
            {activeTabs[4] && <div>123456</div>}
          </div>
          <div className="midPart-right">
            <div className="Container">
              <ul className="items-section">
                {products.map((product, index) => (
                  <li className="a" key={index}>
                    {/* {console.log("here", product)} */}
                    <div
                      className="products"
                      onClick={() => handleClickProduct(product)}
                    >
                      <img
                        className="displayed_images"
                        src={
                          "http://localhost:8000/uploads/" + product.images[0]
                        }
                        alt={product.title}
                      />
                      <div className="info">
                        <h2 className="titles-displayed">{product.title}</h2>
                        <p className="prices-displayed">{product.price}.00$</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="footerGrid">{<Footer />}</div>
      </div>
    </div>
  );
};

export default DisplayProd;
