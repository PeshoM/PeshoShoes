import { useContext, useRef, useState } from "react";
import { ProductContext } from "../Context.tsx";

const useDisplayProd = () => {
  const { products, setProduct, searchedProds, setSearchedProds } = useContext(ProductContext);
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
  const pickedGenders = useRef<string[]>([]);
  const pickedCategories = useRef<string[]>([]);
  const [range, setRange] = useState([null, null]);

  const handleStartChange = (e) => {
    const newStartValue = parseFloat(e.target.value);
    if (newStartValue <= endValue) {
      setStartValue(newStartValue);
    }
  };

  const handleEndChange = (e) => {
    const newEndValue = parseFloat(e.target.value);
    if (newEndValue >= startValue) {
      setEndValue(newEndValue);
    }
  };

  const handleTabClick = (idx: number) => {
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
    const url: string = process.env.REACT_APP_URL + "/filteredData";
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
        pickedGender: pickedGenders.current,
        pickedCategory: pickedCategories.current,
        products: searchedProds,
      }),
    }).then((res) => {
      return res.json();
    });
    setProduct(response.filteredData);
  };

  const handleSizeChanges = (size: number) => {
    for (let i = 0; i < pickedSizes.current.length; i++) {
      if (pickedSizes.current[i] == size)
        return pickedSizes.current.splice(i, 1);
    }
    pickedSizes.current = [...pickedSizes.current, size];
    pickedSizes.current.sort();
    // console.log("sizes picked", pickedSizes.current);
  };

  const handleColorChange = (color) => {
    for (let i = 0; i < pickedColors.current.length; i++) {
      if (pickedColors.current[i] == color)
        return pickedColors.current.splice(i, 1);
    }
    pickedColors.current = [...pickedColors.current, color];
    pickedColors.current.sort();
    // console.log("colors picked", pickedColors.current);
  };

  const handleGenderChange = (gender: string) => {
    for (let i = 0; i < pickedGenders.current.length; i++) {
      if (pickedGenders.current[i] == gender)
        return pickedGenders.current.splice(i, 1);
    }
    pickedGenders.current = [...pickedGenders.current, gender];
    pickedGenders.current.sort();
    console.log("picked gender", pickedGenders.current);
  };

  const handleCategoryChange = (category: string) => {
    for (let i = 0; i < pickedCategories.current.length; i++) {
      if (pickedCategories.current[i] == category)
        return pickedCategories.current.splice(i, 1);
    }
    pickedCategories.current = [...pickedCategories.current, category];
    pickedCategories.current.sort();
    console.log("picked category", pickedCategories.current);
  };
  
  const handleSeasonChange = (season) => {
    for (let i = 0; i < pickedSeasons.current.length; i++) {
      if (pickedSeasons.current[i] == season)
        return pickedSeasons.current.splice(i, 1);
    }
    pickedSeasons.current = [...pickedSeasons.current, season];
    pickedSeasons.current.sort();
    // console.log("seasons picked", pickedSeasons.current);
  };

  const handleClickProduct = (title: string, color: string) => {
    const queryParams = { title, color };
    const searchParams = new URLSearchParams(queryParams);
    const url = `/Product?${searchParams.toString()}`;
    window.location.href = url;
  };

  const fetchData = async () => {
    const url: string = process.env.REACT_APP_URL + "/products";
    const response = await fetch(url, {
      method: "GET",
    }).then((res) => {
      return res.json();
    });
    setProduct(response.products);
    setSearchedProds(response.products);
    setRange((prev) => {
      prev = [...range];
      prev[0] = response.minVal < 100000 ? response.minVal : 0;
      prev[1] = response.maxVal;
      // console.log(prev[0], prev[1], "datatata");
      return prev;
    });
    setStartValue(response.minVal);
    setEndValue(response.maxVal);
    console.log("i got here");
    // console.log("min and max for range", range);
  };
// asd
  const fetchParamsData = async ( params: string | null ) => {
    const url: string = `${process.env.REACT_APP_URL}/fetchParamsData?searchResults=${params}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return res.json();
    });
    setProduct(response.products);
    setSearchedProds(response.products);
    setRange((prev) => {
      prev = [...range];
      prev[0] = response.minVal < 100000 ? response.minVal : 0;
      prev[1] = response.maxVal;
      // console.log(prev[0], prev[1], "datatata");
      return prev;
    });
    setStartValue(response.minVal);
    setEndValue(response.maxVal);
  }

  const handleClickNavigateUrl = async (titleParam: string, nameParam: string) => {
    const url: string = `${
      process.env.REACT_APP_URL
    }/clickedNavigationUrl?title=${encodeURIComponent(
      titleParam
    )}&name=${encodeURIComponent(nameParam)}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return res.json();
    });
    setProduct(response.products);
    setSearchedProds(response.products);
    setRange((prev) => {
      prev = [...range];
      prev[0] = response.minVal < 100000 ? response.minVal : 0;
      prev[1] = response.maxVal;
      console.log("local prev", prev);
      // console.log(prev[0], prev[1], "datatata");
      return prev;
    });
    setStartValue(response.minVal);
    setEndValue(response.maxVal);
  };

  return {
    range,
    activeTabs,
    selectedColor,
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
  };
};

export { useDisplayProd };
