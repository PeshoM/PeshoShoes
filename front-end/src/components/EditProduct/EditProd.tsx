import "../../styles/createprod.css";
import React, { LegacyRef } from "react";
import { useEditProd } from "./useEditProd.ts";
import { Prod } from "../../interfaces/productInterfaces.ts";

interface Edit {
  product: Prod;
}

const EditProd: React.FC<Edit> = ({ product }) => {
  const {
    title,
    description,
    brand,
    pickedColor,
    numOfColors,
    pickedQuantity,
    selectedSeason,
    selectedGender,
    selectedCategory,
    selectedSport,
    imagesRef,
    pickedPrice,
    imgFile,
    setPickedPrice,
    setPickedQuantity,
    HandleRequest,
    updateSizeOptions,
    handleColorChange,
    handleColorVar,
    handleImageChanges,
    handleDeleteColor,
  } = useEditProd(product);
  let sizesArr: number[] = Array.from({ length: 31 }, (_, i) => 34 + i * 0.5);
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
  const imagepath: string = process.env.REACT_APP_URL + "/uploads/";

  return (
    <div>
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        {/* <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure> */}
        <div className="card-body">
          <h2 className="card-title">Fill in the blanks</h2>
          <input
            ref={title as LegacyRef<HTMLInputElement> | undefined}
            type="text"
            placeholder="Type Title here"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            ref={description as LegacyRef<HTMLInputElement> | undefined}
            type="text"
            placeholder="Type Description here"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            ref={brand as LegacyRef<HTMLInputElement> | undefined}
            type="text"
            placeholder="Type Brand here"
            className="input input-bordered w-full max-w-xs"
          />
          {numOfColors.map((a: number[], idx: number) => {
            // console.log(imagesRef.current[idx]);
            return (
              <div className="colorVarContainer">
                {"Color " + (idx + 1)}{" "}
                <button
                  className="delete-edit-modal-button"
                  onClick={() => handleDeleteColor(idx)}
                >
                  Delete color
                </button>
                <br /> {"Switch any picture"}
                <div className="shoe-variations-container">
                  {Array.isArray(imgFile[idx])
                    ? imgFile[idx]?.map((image: File) => {
                        return (
                          <div className={"pic-edit-choices" + idx}>
                            <input
                              type="file"
                              style={{
                                opacity: "0",
                                zIndex: "1",
                                width: "70px",
                                height: "70px",
                                position: "absolute",
                              }}
                            />
                            <img
                              className="pic-choices"
                              src={imagepath + image.name}
                            />
                          </div>
                        );
                      })
                    : Array.from(imgFile[idx] as FileList).map(
                        (image: File) => {
                          return <img src={URL.createObjectURL(image)} />;
                        }
                      )}
                </div>
                <input
                  ref={imagesRef.current[idx]}
                  onChange={() => handleImageChanges(idx)}
                  type="file"
                  className="file-input file-input-bordered w-full max-w-xs"
                  multiple
                />
                <input
                  type="number"
                  placeholder="Type Price here"
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
                  <p>Sizes to put as stocked</p>
                  <div className="sizes-subdiv">
                    {sizesArr.map((size: number, index: number) => (
                      <div className="sizes-choices">
                        {size}
                        {/**make the colors work better with the arr state */}
                        <input
                          type="checkbox"
                          defaultChecked={pickedQuantity[idx][index] > 0}
                          className="checkbox checkbox-sm"
                          onChange={() => {
                            updateSizeOptions(size, idx);
                          }}
                        />
                        <input
                          className="size-quantity-choices"
                          value={pickedQuantity[idx][index] || 0}
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
                  <p>Shoe Colours to put as stocked</p>
                  <p>{pickedColor[idx]}</p>
                  <div className="sizes-subdiv">
                    {colorsArr.map((color: Color, index: number) => (
                      <div className="colors-choices">
                        <div className={color.class + " squares"}>
                          {color.color}
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
            Add a color variation
          </button>
          <div className="colors-seasons-div">
            <div className="seasons-div">
              <p>Select a season</p>
              <select ref={selectedSeason}>
                <option value="" disabled hidden selected>
                  Seasons
                </option>
                <option value="spring">Spring</option>
                <option value="summer">Summer</option>
                <option value="autumn">Autumn</option>
                <option value="winter">Winter</option>
              </select>
            </div>
            <div className="seasons-div">
              <p>Select a season</p>
              <select ref={selectedGender}>
                <option value="" disabled hidden selected>
                  Genders
                </option>
                <option value="man">Man</option>
                <option value="woman">Woman</option>
                <option value="kids">Kids</option>
              </select>
            </div>
            <div className="categories-div">
              <p>Select a shoe category</p>
              <select ref={selectedCategory}>
                <option value="" disabled hidden selected>
                  Categories
                </option>
                <option value="sneakers">Sneakers</option>
                <option value="low Top">Low top</option>
                <option value="slides">Slides</option>
                <option value="slip-ons">Slip-ons</option>
                <option value="sustainable sneakers">
                  Sustainable sneakers
                </option>
                <option value="sandals">Sandals</option>
                <option value="boots">Boots</option>
                <option value="high top">High top</option>
              </select>
            </div>
            <div className="seasons-div">
              <p>Select a sport (optional)</p>
              <select ref={selectedSport}>
                <option value="" selected>
                  Sport
                </option>
                <option value="running">Running</option>
                <option value="skate">Skate</option>
                <option value="basket">Basket</option>
                <option value="fitness">Fitness</option>
                <option value="outdoor">Outdoor</option>
              </select>
            </div>
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={() => HandleRequest()}>
              Create Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProd;
