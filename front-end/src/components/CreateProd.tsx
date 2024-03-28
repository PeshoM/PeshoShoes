import "../styles/createprod.css";
import React from "react";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const CreateProd = () => {
  const title = useRef<string>();
  const description = useRef<string>();
  const [pickedPrice, setPickedPrice] = useState<number[]>([]);
  const [pickedQuantity, setPickedQuantity] = useState<number[][]>([]);
  const quantity = useRef<number>();
  let quantityArr: number[] = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0];
  const [pickedSizes, setPickedSizes] = useState<number[][]>([]);
  let sizesArr: number[] = [
    34, 34.5, 35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41,
    41.5, 42, 42.5, 43, 43.5, 44, 44.5, 45, 45.5, 46, 46.5, 47, 47.5, 48, 48.5,
    49,
  ];
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
  const [pickedColor, setPickedColor] = useState<string[]>([]);
  const selectedSeason = useRef<string[]>();
  const selectedCategory = useRef<string[]>();
  const navigate = useNavigate();
  const [numOfColors, setNumOfColors] = useState<number[]>([]);
  const imagesRef = useRef<any>([]);
  const [imgFile, setImgFile] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch("http://localhost:8000/role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: localStorage.getItem("auth_token"),
        }),
      }).then((res) => res.json());
      console.log(response);
      if (response.role != "admin") navigate("/NotFound");
    };

    fetchData();
  }, []);

  async function HandleRequest() {
    let data = new FormData();
    //@ts-ignore
    console.log("picked title", title.current.value);
    //@ts-ignore
    console.log("picked desc", description.current.value);
    console.log("picked color", pickedColor);
    console.log("picked price", pickedPrice);
    console.log("picked quantity", pickedQuantity);
    console.log("picked sizes", pickedSizes);
    console.log("picked images", imgFile);
    //@ts-ignore
    data.append("title", title.current.value);
    //@ts-ignore
    data.append("description", description.current.value);
    for (let i: number = 0; i < pickedColor.length; i++) {
      data.append("color", pickedColor[i]);
    }
    for (let i: number = 0; i < pickedPrice.length; i++) {
      //@ts-ignore
      data.append("price", pickedPrice[i]);
    }
    for (let rowIndex = 0; rowIndex < pickedSizes.length; rowIndex++) {
      const row = pickedSizes[rowIndex];
      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        const value = row[colIndex];
        data.append(`sizes_${rowIndex}_${colIndex}`, String(value));
      }
    }
    for (let rowIndex = 0; rowIndex < pickedQuantity.length; rowIndex++) {
      const row = pickedQuantity[rowIndex];
      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        const value = row[colIndex];
        value != 0 && data.append(`quantity_${rowIndex}_${colIndex}`, String(value));
      }
    }
    //@ts-ignore
    data.append("season", selectedSeason.current.value);

    for (let i = 0; i < imgFile.length; i++) {
      const fileList = imgFile[i];
      for (let j = 0; j < fileList.length; j++) {
        data.append(`images_${i}_${j}`, fileList[j]);
      }
    }
    // data.append("key", localStorage.getItem('auth_token'))
    const response = await fetch("http://localhost:8000/products", {
      method: "POST",
      body: data,
    });
  }

  const updateSizeOptions = (size: number, idx: number) => {
    if (!pickedSizes) return;
    for (let i = 0; i < pickedSizes[idx].length; i++) {
      if (pickedSizes[idx][i] == size) return pickedSizes[idx].splice(i, 1);
    }
    pickedSizes[idx] = [...pickedSizes[idx], size];
    pickedSizes[idx].sort();
    // console.log("sizes picked", pickedSizes);
  };

  const handleColorChange = (color: string, idx: number) => {
    setPickedColor((prev: string[]): any => {
      prev = [...pickedColor];
      prev[idx] = color;
      return prev;
    });
    // console.log(pickedColor);
  };

  const handleColorVar = () => {
    setNumOfColors([...numOfColors, 0]);
    setImgFile([...imgFile, []]);
    setPickedPrice([...pickedPrice, 0]);
    setPickedQuantity([...pickedQuantity, quantityArr]);
    setPickedSizes([...pickedSizes, []]);
    setPickedColor([...pickedColor, ""]);
    console.log("num of colors", numOfColors);
    console.log("picked color", pickedColor);
    console.log("picked price", pickedPrice);
    console.log("picked quantity", pickedQuantity);
    console.log("picked sizes", pickedSizes);
    console.log("picked images", imgFile);
    // console.log("picked images ref", imagesRef.current);
  };

  const handleImageChanges = (idx: number) => {
    setImgFile((prev) => {
      prev = [...imgFile];
      if (imagesRef.current?.files) prev[idx] = imagesRef.current.files;
      return prev;
    });
  };
  return (
    <div>
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        {/* <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure> */}
        <div className="card-body">
          <h2 className="card-title">Fill in the blanks</h2>
          <input
            //@ts-ignore
            ref={title}
            type="text"
            placeholder="Type Title here"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            //@ts-ignore
            ref={description}
            type="text"
            placeholder="Type Description here"
            className="input input-bordered w-full max-w-xs"
          />
          {numOfColors.map((a, idx) => (
            <div className="colorVarContainer">
              {"Color " + (idx + 1)}
              <input
                ref={imagesRef}
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
              {/* <input
                //@ts-ignore
                type="number"
                placeholder="Type Quantity here"
                value={pickedQuantity[idx]}
                onChange={(e) => {
                  setPickedQuantity((prev) => {
                    prev = [...pickedQuantity];
                    prev[idx] = parseInt(e.target.value);
                    return prev;
                  });
                }}
                className="input input-bordered w-full max-w-xs"
              /> */}
              <div className="sizes-div">
                <p>Sizes to put as stocked</p>
                <div className="sizes-subdiv">
                  {sizesArr.map((size: number, index: number) => (
                    <div className="sizes-choices">
                      {size}
                      {/**make the colors work better with the arr state */}
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
                <p>Shoe Colours to put as stocked</p>
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
          ))}
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
              {/*@ts-ignore*/}
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
            <div className="categories-div">
              <p>Select a shoe category</p>
              {/*@ts-ignore*/}
              <select ref={selectedCategory}>
                <option value="" disabled hidden selected>
                  Categories
                </option>
                <option value="sport">Sport</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="formal">Formal</option>
                <option value="outdoor">Outdoor</option>
                <option value="specialty">Specialty</option>
                <option value="trends">Fashion Trends</option>
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

export default CreateProd;
