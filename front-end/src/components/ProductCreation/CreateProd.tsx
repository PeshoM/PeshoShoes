import "../../styles/createprod.css";
import React, { LegacyRef } from "react";
import { useCreateProd } from "./useCreateProd.ts";
import { useTranslation } from "react-i18next";

const CreateProd: React.FC = () => {
  const {
    title,
    description,
    brand,
    pickedColor,
    numOfColors,
    pickedQuantity,
    selectedSeason,
    imagesRef,
    pickedPrice,
    selectedGender,
    selectedCategory,
    selectedSport,
    setPickedPrice,
    setPickedQuantity,
    HandleRequest,
    updateSizeOptions,
    handleColorChange,
    handleColorVar,
    handleImageChanges,
    handleDeleteColor,
  } = useCreateProd();
  const sizesArr: number[] = Array.from({ length: 31 },(_, index) => 34 + index * 0.5);
  interface Color {
    color: string;
    class: string;
  }
  let colorsArr: Color[] = [
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
  const { t } = useTranslation();

  return (
    <div>
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        {/* <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure> */}
        <div className="card-body">
          <h2 className="card-title">{t("Fill in the blanks")}</h2>
          <input
            ref={title as LegacyRef<HTMLInputElement> | undefined}
            type="text"
            placeholder={t("Type Title here")}
            className="input input-bordered w-full max-w-xs"
          />
          <input
            ref={description as LegacyRef<HTMLInputElement> | undefined}
            type="text"
            placeholder={t("Type Description here")}
            className="input input-bordered w-full max-w-xs"
          />
          <input
            ref={brand as LegacyRef<HTMLInputElement> | undefined}
            type="text"
            placeholder={t("Type Brand here")}
            className="input input-bordered w-full max-w-xs"
          />
          {numOfColors.map((a, idx) => {
            // console.log(imagesRef.current[idx]);
            return (
              <div className="colorVarContainer">
                {t("Color") + " " + (idx + 1)}
                <button
                  className="delete-edit-modal-button"
                  onClick={() => handleDeleteColor(idx)}
                >
                  {t("Delete color")}
                </button>
                <input
                  ref={imagesRef.current[idx]}
                  onChange={() => handleImageChanges(idx)}
                  type="file"
                  className="file-input file-input-bordered w-full max-w-xs"
                  multiple
                />
                <input
                  type="number"
                  placeholder={t("Type Price here")}
                  value={pickedPrice[idx]}
                  onChange={(e) => {
                    setPickedPrice((prev) => {
                      prev = [...pickedPrice];
                      prev[idx] = parseFloat(
                        parseFloat(e.target.value).toFixed(2)
                      );
                      return prev;
                    });
                  }}
                  className="input input-bordered w-full max-w-xs"
                />
                <div className="sizes-div">
                  <p>{t("Sizes to put as stocked")}</p>
                  <div className="sizes-subdiv">
                    {sizesArr.map((size: number, index: number) => (
                      <div className="sizes-choices">
                        {size}
                        <input
                          type="checkbox"
                          defaultChecked={false}
                          className="checkbox checkbox-sm"
                          onChange={() => {
                            updateSizeOptions(size, idx);
                          }}
                        />
                        <input
                          className="size-quantity-choices"
                          onChange={(e) => {
                            setPickedQuantity((prev) => {
                              prev = [...pickedQuantity];
                              prev[idx][index] = parseInt(e.target.value);
                              return prev;
                            });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="sizes-div">
                  <p>{t("Shoe Colours to put as stocked")}</p>
                  <div className="sizes-subdiv">
                    {colorsArr.map((color: Color) => (
                      <div className="colors-choices">
                        <div className={color.class + " squares"}>
                          {t(color.color)}
                        </div>
                        <input
                          type="radio"
                          name="color"
                          className="checkbox checkbox-sm"
                          checked={pickedColor[idx] === color.color}
                          onChange={() => {
                            handleColorChange(color.color, idx);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
          <button
            className="colorVarButton"
            onClick={() => {
              handleColorVar();
            }}
          >
            {t("Add a color variation")}
          </button>
          <div className="colors-seasons-div">
            <div className="seasons-div">
              <p>{t("Select a season")}</p>
              <select ref={selectedSeason}>
                <option value="" disabled hidden selected>
                  {t("Seasons")}
                </option>
                <option value="spring">{t("Spring")}</option>
                <option value="summer">{t("Summer")}</option>
                <option value="autumn">{t("Autumn")}</option>
                <option value="winter">{t("Winter")}</option>
              </select>
            </div>
            <div className="seasons-div">
              <p>{t("Select a gender")}</p>
              <select ref={selectedGender}>
                <option value="" disabled hidden selected>
                  {t("Genders")}
                </option>
                <option value="man">{t("Man")}</option>
                <option value="woman">{t("Woman")}</option>
                <option value="kids">{t("Kids")}</option>
              </select>
            </div>
            <div className="categories-div">
              <p>{t("Select a shoe category")}</p>
              <select ref={selectedCategory}>
                <option value="" disabled hidden selected>
                  {t("Categories")}
                </option>
                <option value="sneakers">{t("Sneakers")}</option>
                <option value="low Top">{t("Low top")}</option>
                <option value="slides">{t("Slides")}</option>
                <option value="slip-ons">{t("Slip-ons")}</option>
                <option value="sustainable sneakers">
                  {t("Sustainable sneakers")}
                </option>
                <option value="sandals">{t("Sandals")}</option>
                <option value="boots">{t("Boots")}</option>
                <option value="high top">{t("High top")}</option>
              </select>
            </div>
            <div className="seasons-div">
              <p>{t('Select a sport')} ({t('optional')})</p>
              <select ref={selectedSport}>
                <option value="" selected>
                  {t('Sport')}
                </option>
                <option value="running">{t('Running')}</option>
                <option value="skate">{t('Skate')}</option>
                <option value="basket">{t('Basket')}</option>
                <option value="fitness">{t('Fitness')}</option>
                <option value="outdoor">{t('Outdoor')}</option>
              </select>
            </div>
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={() => HandleRequest()}>
              {t('Create Product')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProd;
