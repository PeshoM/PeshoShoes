import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const useCreateProd = () => {
  const title = useRef<HTMLInputElement>();
  const description = useRef<HTMLInputElement>();
  const brand = useRef<HTMLInputElement>();
  const [pickedPrice, setPickedPrice] = useState<number[]>([]);
  const [pickedQuantity, setPickedQuantity] = useState<number[][]>([]);
  let quantityArr: number[] = Array.from({ length: 31 }, (_, i) => 0);
  const [pickedSizes, setPickedSizes] = useState<number[][]>([]);
  const [pickedColor, setPickedColor] = useState<string[]>([]);
  const selectedSeason = useRef<HTMLSelectElement>(null);
  const selectedGender = useRef<HTMLSelectElement>(null);
  const selectedCategory = useRef<HTMLSelectElement>(null);
  const selectedSport = useRef<HTMLSelectElement>(null);
  const [numOfColors, setNumOfColors] = useState<number[]>([]);
  const imagesRef = useRef<any>([]);
  const [imgFile, setImgFile] = useState<any>([]);
  const navigate = useNavigate();

  async function HandleRequest() {
    let data = new FormData();
    data.append("title", title.current!.value);
    data.append("description", description.current!.value);
    data.append("brand", brand.current!.value);
    for (let i: number = 0; i < pickedColor.length; i++) {
      data.append("color", pickedColor[i]);
    }
    for (let i: number = 0; i < pickedPrice.length; i++) {
      //@ts-ignore
      data.append("price", pickedPrice[i]);
    }
    for (let rowIndex: number = 0; rowIndex < pickedSizes.length; rowIndex++) {
      const row: number[] = pickedSizes[rowIndex];
      for (let colIndex: number = 0; colIndex < row.length; colIndex++) {
        const value = row[colIndex];
        data.append(`sizes_${rowIndex}_${colIndex}`, String(value));
      }
    }
    for (
      let rowIndex: number = 0;
      rowIndex < pickedQuantity.length;
      rowIndex++
    ) {
      const row = pickedQuantity[rowIndex];
      for (let colIndex: number = 0; colIndex < row.length; colIndex++) {
        const value = row[colIndex];
        value != 0 &&
          data.append(`quantity_${rowIndex}_${colIndex}`, String(value));
      }
    }

    data.append("season", selectedSeason.current!.value);
    data.append("gender", selectedGender.current!.value);
    data.append("category", selectedCategory.current!.value);
    data.append("sport", selectedSport.current!.value);

    for (let i: number = 0; i < imgFile.length; i++) {
      const fileList = imgFile[i];
      for (let j: number = 0; j < fileList.length; j++) {
        data.append(`images_${i}_${j}`, fileList[j]);
      }
    }
    // data.append("key", localStorage.getItem('auth_token'))
    const url: string = process.env.REACT_APP_URL + "/products";
    const response: Response = await fetch(url, {
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
  };

  const handleColorChange = (color: string, idx: number) => {
    setPickedColor((prev: string[]): any => {
      prev = [...pickedColor];
      prev[idx] = color;
      return prev;
    });
  };

  const handleColorVar = () => {
    const newRef = React.createRef();
    imagesRef.current.push(newRef);
    setNumOfColors([...numOfColors, 0]);
    setImgFile([...imgFile, []]);
    setPickedPrice([...pickedPrice, 0]);
    setPickedQuantity([...pickedQuantity, quantityArr]);
    setPickedSizes([...pickedSizes, []]);
    setPickedColor([...pickedColor, ""]);

    console.log("picked images", imgFile);
    console.log(imagesRef.current);
    for (let i: number = 0; i < imagesRef.current.length; i++) {
      console.log("line115 images ref", i, imagesRef.current[i].current?.files);
    }
  };

  const handleImageChanges = (idx: number) => {
    setImgFile((prev) => {
      prev = [...imgFile];
      if (imagesRef.current[idx].current.files)
        prev[idx] = imagesRef.current[idx].current.files;
      return prev;
    });
  };
  useEffect(() => {
    const fetchRoleData = async () => {
      const url: string = process.env.REACT_APP_URL + "/role";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: localStorage.getItem("auth_token"),
        }),
      }).then((res) => res.json());
      if (response.role != "admin") navigate("/NotFound");
    };
    fetchRoleData();
  }, []);

  const handleDeleteColor = (idx: number) => {
    setPickedColor((prevColors) => {
      const updatedColors = [...prevColors];
      updatedColors.splice(idx, 1);
      return updatedColors;
    });

    setNumOfColors((prevNums) => {
      const updatedNums = [...prevNums];
      updatedNums.splice(idx, 1);
      return updatedNums;
    });

    setPickedQuantity((prevQuantities) => {
      const updatedQuantities = [...prevQuantities];
      updatedQuantities.splice(idx, 1);
      return updatedQuantities;
    });

    setPickedSizes((prevSizes) => {
      const updatedSizes = [...prevSizes];
      updatedSizes.splice(idx, 1);
      return updatedSizes;
    });

    setPickedPrice((prevPrices) => {
      const updatedPrices = [...prevPrices];
      updatedPrices.splice(idx, 1);
      return updatedPrices;
    });

    setImgFile((prevImgFiles) => {
      const updatedImgFiles = [...prevImgFiles];
      updatedImgFiles.splice(idx, 1);
      return updatedImgFiles;
    });

    imagesRef.current.splice(idx, 1);
  };

  return {
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
  };
};

export { useCreateProd };
