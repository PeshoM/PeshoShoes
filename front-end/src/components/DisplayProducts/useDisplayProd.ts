import { useContext, useRef, useState } from "react";
import { ProductContext } from "../Context.tsx";

const useDisplayProd = () => {
const {
  setProduct,
  searchedProds,
} = useContext(ProductContext);
const [activeTabs, setActiveTabs] = useState<boolean[]>([
  false,
  false,
  false,
  false,
  false,
]);
const [startValue, setStartValue] = useState(0);
const [endValue, setEndValue] = useState(100);
const pickedSizes = useRef<number[]>([]);
const searchedProducts = useRef([]);
const [selectedColor, setSelectedColor] = useState(null);
const pickedColors = useRef<string[]>([]);
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

const handleTabClick = (idx) => {
  setActiveTabs((prevActiveTabs) => {
    prevActiveTabs = [...activeTabs];
    prevActiveTabs[idx] = !prevActiveTabs[idx];
    return prevActiveTabs;
  });
};

const handleFiltering = async () => {
  console.log(
    startValue,
    endValue,
    pickedSizes,
    selectedColor,
    searchedProducts.current
  );
  const url: string =
    process.env.REACT_APP_DISPLAY_PROD_FILTERED_DATA_URL || "";
  let response = await fetch(url, {
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
      products: searchedProds,
    }),
  }).then((res) => {
    return res.json();
  });
  setProduct(response.filteredData);
};

const handleSizeChanges = (size: number) => {
  for (let i = 0; i < pickedSizes.current.length; i++) {
    if (pickedSizes.current[i] == size) return pickedSizes.current.splice(i, 1);
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
};
const handleClickProduct = (title: string, color: string) => {
  const queryParams = { title, color };
  const searchParams = new URLSearchParams(queryParams);
  const url = `/Product?${searchParams.toString()}`;
  window.location.href = url;
};

return {
  activeTabs,
  selectedColor,
  handleStartChange,
  handleEndChange,
  handleTabClick,
  handleFiltering,
  handleSizeChanges,
  handleColorChange,
  handleSeasonChange,
  handleClickProduct,
};
}

export { useDisplayProd };