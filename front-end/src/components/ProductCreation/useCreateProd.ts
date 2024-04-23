import React, { useRef, useState } from "react";

const useCreateProd = () => {
  const title = useRef<HTMLInputElement>();
  const description = useRef<HTMLInputElement>();
  const [pickedPrice, setPickedPrice] = useState<number[]>([]);
  const [pickedQuantity, setPickedQuantity] = useState<number[][]>([]);
  let quantityArr: number[] = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
  ];
  const [pickedSizes, setPickedSizes] = useState<number[][]>([]);
  const [pickedColor, setPickedColor] = useState<string[]>([]);
  const selectedSeason = useRef<HTMLInputElement>();
  const [numOfColors, setNumOfColors] = useState<number[]>([]);
  const imagesRef = useRef<any>([]);
  const [imgFile, setImgFile] = useState<any>([]);

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
    for (let rowIndex: number = 0; rowIndex < pickedSizes.length; rowIndex++) {
      const row = pickedSizes[rowIndex];
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

  const handleColorVar = () => {
    // Create a new ref and add it to the existing array of refs
    const newRef = React.createRef();
    imagesRef.current.push(newRef);
    // setImagesRef([...imagesRef, newRef])

    // Update state as needed
    setNumOfColors([...numOfColors, 0]);
    setImgFile([...imgFile, []]);
    setPickedPrice([...pickedPrice, 0]);
    setPickedQuantity([...pickedQuantity, quantityArr]);
    setPickedSizes([...pickedSizes, []]);
    setPickedColor([...pickedColor, ""]);

    // Logging for debugging
    // console.log("num of colors", numOfColors);
    // console.log("picked color", pickedColor);
    // console.log("picked price", pickedPrice);
    // console.log("picked quantity", pickedQuantity);
    // console.log("picked sizes", pickedSizes);
    console.log("picked images", imgFile);
    console.log(imagesRef.current);
    for (let i = 0; i < imagesRef.current.length; i++) {
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

  return {
    title,
    description,
    pickedColor,
    numOfColors,
    pickedQuantity,
    selectedSeason,
    imagesRef,
    pickedPrice,
    setPickedPrice,
    setPickedQuantity,
    HandleRequest,
    updateSizeOptions,
    handleColorChange,
    handleColorVar,
    handleImageChanges,
  };
};

export { useCreateProd };
