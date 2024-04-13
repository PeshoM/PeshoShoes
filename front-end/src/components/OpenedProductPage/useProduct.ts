import { useState } from "react";

const useProduct = () => {
    const [product, setProduct] = useState<Prod>();
    const [sizesSet, setSizesSet] = useState<Set<number>>(new Set<number>());
    interface ColorVariation {
      images: string[];
      price: number;
      quantity: number[];
      sizes: number[];
      color: string;
      rating: number[];
    }
    interface Prod {
      title: string;
      description: string;
      colorVariations: ColorVariation[];
      season: string;
    }

    const handleImageClick = (idx: number) => {
      let newArr: ColorVariation[] = [];
      product && newArr.push(product.colorVariations[idx]);
      product && product.colorVariations.splice(idx, 1);
      console.log("newArr", newArr);
      console.log("product", product);
      if (product)
        for (let i: number = 0; i < product?.colorVariations.length; i++) {
          console.log(i);
          newArr.push(product?.colorVariations[i]);
        }
      console.log("post pushing", newArr);
      let obj = {};
      obj["title"] = product?.title;
      obj["description"] = product?.description;
      obj["colorVariations"] = newArr;
      obj["season"] = product?.season;
      setSizesSet(new Set<number>(newArr[0].sizes));
      console.log("set", sizesSet);

      const queryParams = {
        title: product?.title,
        color: newArr[0].color,
      };
      //@ts-ignore
      const searchParams = new URLSearchParams(queryParams);
      const url = `/Product?${searchParams.toString()}`;
      window.location.href = url;
      //@ts-ignore
      setProduct(obj);
    };

    return {
        product,
        setProduct,
      handleImageClick,
    };
}

export { useProduct };