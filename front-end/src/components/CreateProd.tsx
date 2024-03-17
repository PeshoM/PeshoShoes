import "../styles/createprod.css";
import React from 'react';
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const CreateProd = () => {
  const title = useRef<string>();
  const description = useRef<string>();
  const price = useRef<number>();
  const pickedSizes = useRef<number[]>([]);
  let sizesArr: number[] = [
    34, 34.5, 35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41,
    41.5, 42, 42.5, 43, 43.5, 44, 44.5, 45, 45.5, 46, 46.5, 47, 47.5, 48, 48.5,
    49,
  ];
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
  const [pickedColor, setPickedColor] = useState<string | null>(null);
  const selectedSeason = useRef<string[]>();
  const selectedCategory = useRef<string[]>();
  const navigate = useNavigate();

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
    let imagedata = document.querySelector('input[type="file"]').files;
    console.log(imagedata);
    //@ts-ignore
    data.append("title", title.current.value);
    for (let i = 0; i < imagedata.length; i++) {
      data.append("images", imagedata[i]);
    }
    console.log("sizes arr", pickedSizes.current);
    //@ts-ignore
    data.append("description", description.current.value);
    //@ts-ignore
    data.append("price", price.current.value);
    for (let i = 0; i < pickedSizes.current.length; i++) {
      //@ts-ignore
      data.append("sizes", pickedSizes.current[i]);
    }
    //@ts-ignore
    data.append("color", pickedColor);
    //@ts-ignore
    data.append("season", selectedSeason.current.value);
    // data.append("key", localStorage.getItem('auth_token'))
    const response = await fetch("http://localhost:8000/products", {
      method: "POST",
      body: data,
    });
  }

  const updateSizeOptions = (size: number) => {
    for (let i = 0; i < pickedSizes.current.length; i++) {
      if (pickedSizes.current[i] == size)
        return pickedSizes.current.splice(i, 1);
    }
    pickedSizes.current = [...pickedSizes.current, size];
    pickedSizes.current.sort();
    console.log("sizes picked", pickedSizes.current);
  };


    
  
    const handleColorChange = (color: string) => {
      setPickedColor(color);
      console.log(pickedColor);
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
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
            multiple
          />
          <input
            //@ts-ignore
            ref={price}
            type="number"
            placeholder="Type Price here"
            className="input input-bordered w-full max-w-xs"
          />
          <div className="sizes-div">
            <p>Sizes to put as stocked</p>
            <div className="sizes-subdiv">
              {sizesArr.map((size, index) => (
                <div className="sizes-choices">
                  {size}
                  <input
                    type="checkbox"
                    defaultChecked={false}
                    className="checkbox checkbox-sm"
                    onChange={() => {
                      updateSizeOptions(size);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="sizes-div">
            <p>Shoe Colours to put as stocked</p>
            <div className="sizes-subdiv">
              {colorsArr.map((color, index) => (
                <div className="colors-choices" key={index}>
                  <div className={color.class + " squares"}>{color.color}</div>
                  <input
                    type="radio"
                    name="color"
                    className="checkbox checkbox-sm"
                    checked={pickedColor === color.color}
                    onChange={() => {
                      handleColorChange(color.color);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
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
