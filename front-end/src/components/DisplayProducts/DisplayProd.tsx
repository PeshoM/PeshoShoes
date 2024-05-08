import "../../styles/displayprod.css";
import "../../styles/main.css";
import { useEffect, useState, useContext } from "react";
import React from "react";
import Footer from "../Footer.tsx";
import Navigation from "../NavigationBar/Navigation.tsx";
import { ProductContext } from "../Context.tsx";
import { useDisplayProd } from "./useDisplayProd.ts";
import { useSearchParams } from "react-router-dom";
import { Prod } from "../../interfaces/productInterfaces.ts";
import { useTranslation } from "react-i18next";

const DisplayProd = () => {
  const {
    range,
    activeTabs,
    startValue,
    setStartValue,
    endValue,
    setEndValue,
    handleStartChange,
    handleEndChange,
    handleTabClick,
    handleFiltering,
    handleSizeChanges,
    handleColorChange,
    handleSeasonChange,
    handleClickProduct,
    fetchData,
    fetchParamsData,
    handleGenderChange,
    handleCategoryChange,
    handleClickNavigateUrl,
  } = useDisplayProd();
  const { products, setProduct, searchedProds, setSearchedProds } =
    useContext(ProductContext);
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
  const imagepath: string = process.env.REACT_APP_URL + "/uploads/";
  const [searchParams] = useSearchParams();
  const searchResults: string | null = searchParams.get("searchResults");
  const title: string | null = searchParams.get("title");
  const name: string | null = searchParams.get("name");
  const gendersArr: string[] = ["men", "women", "kids"];
  const categoriesArr: string[] = [
    "sneakers",
    "low Top",
    "slides",
    "slip-ons",
    "sustainable sneakers",
    "sandals",
    "boots",
    "high top",
  ];
  const { t } = useTranslation();

  useEffect(() => {
    !searchResults ? fetchData() : fetchParamsData(searchResults);
  }, [searchResults]);

  useEffect(() => {
    (!title || !name) ? fetchData() : handleClickNavigateUrl(title, name);
  }, [title]);

  useEffect(() => {
    !title || !name ? fetchData() : handleClickNavigateUrl(title, name);
  }, [name]);

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
              {t('SIZE')}
            </div>
            {activeTabs[0] && (
              <div className="sizes-menu">
                <p>{t('EUROPEAN')}</p>
                <div>
                  {Array.from(
                    { length: 31 },
                    (_, index) => 34 + index * 0.5
                  ).map((size: number) => (
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
            <div className="filtering-options price-filt-option">{t('PRICE')}</div>
            <div className="double-range-slider">
              <input
                type="range"
                min={range[0]!}
                max={range[1]!}
                step={0.1}
                value={startValue}
                onChange={handleStartChange}
                onMouseUp={handleFiltering}
              />
              <input
                type="range"
                step={0.1}
                min={range[0]!}
                max={range[1]!}
                value={endValue}
                onChange={handleEndChange}
                onMouseUp={handleFiltering}
              />
              <span>
                {t('Start Value')}: {startValue > 100000 ? 0 : startValue } {t('BGN')} {<br />} {t('End Value')}: {endValue} {t('BGN')}
              </span>
            </div>
            <div
              className="filtering-options"
              onClick={() => {
                handleTabClick(1);
              }}
            >
              {t('COLOUR')}
            </div>
            {activeTabs[1] && (
              <div className="colors-main">
                <div className="colors-div-display">
                  <p>{t('Shoe colour')}</p>
                  <div className="colors-subdiv-display">
                    {colorsArr.map((color) => (
                      <div className="colors-choices-display">
                        <input
                          type="checkbox"
                          defaultChecked={false}
                          name="colors"
                          value={color.color}
                          onChange={() => {
                            handleColorChange(color.color);
                            handleFiltering();
                          }}
                        />
                        {t(color.color)}
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
              {t('SEASON')}
            </div>
            {activeTabs[2] && (
              <div className="seasons-main">
                <div className="seasons-div-display">
                  <div className="seasons-subdiv-display">
                    {["spring", "summer", "autumn", "winter"].map((season) => (
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
                        <div>{t(season)}</div>
                      </div>
                    ))}
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
              {t('SALE')}
            </div>
            {activeTabs[3] && <div>12345</div>}
            <div
              className="filtering-options"
              onClick={() => {
                handleTabClick(4);
              }}
            >
              {t('CATEGORIES')}
            </div>
            {activeTabs[4] && (
              <div className="categories-main">
                <div>
                  <div>
                    {categoriesArr.map((category) => (
                      <div className="colors-choices-display">
                        <input
                          type="checkbox"
                          defaultChecked={false}
                          name="categories"
                          value={category}
                          onChange={() => {
                            handleCategoryChange(category);
                            handleFiltering();
                          }}
                        />
                        {t(category)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div
              className="filtering-options"
              onClick={() => {
                handleTabClick(5);
              }}
            >
              {t('GENDER')}
            </div>
            {activeTabs[5] && (
              <div className="genders-main">
                <div className="colors-div-display">
                  <div className="colors-subdiv-display">
                    {gendersArr.map((gender) => (
                      <div className="colors-choices-display">
                        <input
                          type="checkbox"
                          defaultChecked={false}
                          name="genders"
                          value={gender}
                          onChange={() => {
                            handleGenderChange(gender);
                            handleFiltering();
                          }}
                        />
                        {t(gender)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="midPart-right">
            <div className="Container">
              <ul className="items-section">
                {products.map((product: Prod, index: number) => (
                  <>
                    {product.colorVariations.map((colorVar) => (
                      <li className="a" key={index}>
                        <div
                          className="products"
                          onClick={() =>
                            handleClickProduct(product.title, colorVar.color)
                          }
                        >
                          <img
                            className="displayed_images"
                            src={imagepath + colorVar.images[0]}
                            alt={product.title}
                          />
                          <div className="info">
                            <h2 className="titles-displayed">
                              {product.title}
                            </h2>
                            <p className="prices-displayed">
                              {colorVar.price}лв.
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </>
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
