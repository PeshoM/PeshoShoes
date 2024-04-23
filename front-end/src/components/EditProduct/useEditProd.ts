import React, { useRef, useState, useEffect } from "react";
import { ColorVariation, Prod } from "../../interfaces/productInterfaces";

const useEditProd = (product: Prod) => {
  const title = useRef<HTMLInputElement>();
  const description = useRef<HTMLInputElement>();
  const [pickedPrice, setPickedPrice] = useState<number[]>([]);
  const [pickedQuantity, setPickedQuantity] = useState<number[][]>([]);
  let quantityArr: number[] = Array.from({ length: 31 }, (_, i) => 0);
  console.log(quantityArr);
  const [pickedSizes, setPickedSizes] = useState<number[][]>([]);
  const [pickedColor, setPickedColor] = useState<string[]>([]);
  const selectedSeason = useRef<HTMLSelectElement>();
  const [numOfColors, setNumOfColors] = useState<any[]>([]);
  const imagesRef = useRef<any>([]);
  const [imgFile, setImgFile] = useState<FileList[] | any[]>([]);

  useEffect(() => {
    if (title.current) title.current.value = product.title;
    if (description.current) description.current.value = product.description;
    if (selectedSeason.current) selectedSeason.current.value = product.season;

    // Initialize state arrays based on product color variations
    const initialPickedPrice: number[] = [];
    const initialPickedQuantity: number[][] = [];
    const initialPickedSizes: number[][] = [];
    const initialPickedColor: string[] = [];
    const initialNumOfColors: number[] = [];
    const initialImgFile: File[][] = [];

    for (let i = 0; i < product.colorVariations.length; i++) {
      const colorVariation = product.colorVariations[i];
      const newRef = React.createRef();
      imagesRef.current.push(newRef);

      // Populate imgFile with image data for each color variation
      initialImgFile.push(
        colorVariation.images.map((image) => new File([image], image))
      );

      initialPickedPrice.push(colorVariation.price);
      initialPickedQuantity.push([...colorVariation.quantity]);
      initialPickedSizes.push([...colorVariation.sizes]);
      initialPickedColor.push(colorVariation.color);
      initialNumOfColors.push(0);
    }

    // Set the initial state values
    setImgFile(initialImgFile);
    setPickedPrice(initialPickedPrice);
    setPickedQuantity(initialPickedQuantity);
    setPickedSizes(initialPickedSizes);
    setPickedColor(initialPickedColor);
    setNumOfColors(initialNumOfColors);
  }, []);

  const handleColorVar = () => {
    const newRef = React.createRef();
    imagesRef.current.push(newRef);
    // Set The Values
    setNumOfColors([...numOfColors, 0]);
    setImgFile([...imgFile, []]);
    setPickedPrice([...pickedPrice, 0]);
    setPickedQuantity([...pickedQuantity, quantityArr]);
    setPickedSizes([...pickedSizes, []]);
    setPickedColor([...pickedColor, ""]);

    // console.log("num of colors", numOfColors);
    // console.log("picked color", pickedColor);
    // console.log("picked price", pickedPrice);
    // console.log("picked quantity", pickedQuantity);
    // console.log("picked sizes", pickedSizes);
    // console.log("picked images", imgFile);
    console.log(imagesRef.current);
    for (let i = 0; i < imagesRef.current.length; i++) {
      console.log("picked images ref", i, imagesRef.current[i].current?.files);
    }
  };

  async function HandleRequest() {
    let data = new FormData();
    // console.log("picked title", title.current?.value);
    // console.log("picked desc", description.current?.value);
    // console.log("picked color", pickedColor);
    // console.log("picked price", pickedPrice);
    // console.log("picked quantity", pickedQuantity);
    // console.log("picked sizes", pickedSizes);
    // console.log("picked images", imgFile);
    data.append("title", title.current!.value);
    data.append("description", description.current!.value);
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
    //@ts-ignore
    data.append("season", selectedSeason.current.value);

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

  useEffect(() => {
    console.log(imgFile);
  }, [imgFile]);

  const handleImageChanges = (idx: number) => {
    setImgFile((prev) => {
      prev = [...imgFile];
      if (imagesRef.current[idx].current.files)
        prev[idx] = imagesRef.current[idx].current.files;
      return prev;
    });
    console.log(imgFile);
  };

  return {
    title,
    description,
    pickedColor,
    numOfColors,
    pickedQuantity,
    selectedSeason,
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
  };
};

export { useEditProd };
