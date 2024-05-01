import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { ColorVariation, Prod } from "../../interfaces/productInterfaces";

const useProduct = () => {
  const [product, setProduct] = useState<Prod>();
  const [sizesSet, setSizesSet] = useState<Set<number>>(new Set<number>());
  const [quantityArr, setQuantityArr] = useState<number[][]>([]);
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const color = searchParams.get("color");
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [imageIdx, setImageIdx] = useState<number>(-1);
  const [zoomed, setZoomed] = useState(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const outOfStockRef = useRef();
  const sizesRef = useRef();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    let fetchProduct = async () => {
      const url: string = process.env.REACT_APP_URL + "/fetchProduct";
      console.log(searchParams.toString());
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          color,
        }),
      }).then((res) => {
        return res.json();
      });
      setProduct(response.product);
      setSizesSet(new Set<number>(response.product.colorVariations[0].sizes));
      setQuantityArr(response.product.colorVariations[0].quantity);
    };
    fetchProduct();
  }, []);

  useEffect(() => {
    if (isClicked) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "15px";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    };
  }, [isClicked]);

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
    let obj: Prod = {
      title: "",
      description: "",
      colorVariations: [
        { images: [], price: 0, quantity: [], sizes: [], color: "" },
      ],
      season: "",
      _id: "",
    };
    obj.title = product!.title;
    obj.description = product!.description;
    obj.colorVariations = newArr;
    obj.season = product!.season;
    obj._id = product!._id;
    setSizesSet(new Set<number>(newArr[0].sizes));
    console.log("set", sizesSet);

    const queryParams = {
      title: product!.title,
      color: newArr[0].color,
    };
    const searchParams = new URLSearchParams(queryParams);
    const url = `/Product?${searchParams.toString()}`;
    window.location.href = url;
    setProduct(obj);
  };

  const handleSwitchModalImageLeft = () => {
    imageIdx > 0 ? setImageIdx(imageIdx - 1) : setImageIdx(5);
    setZoomed(false);
  };

  const handleSwitchModalImageRight = () => {
    imageIdx <= 4 ? setImageIdx(imageIdx + 1) : setImageIdx(0);
    setZoomed(false);
  };

  const handleZoom = () => {
    setZoomed(!zoomed);
  };

  const handleCloseModal = () => {
    setIsClicked(false);
  };

  const handleOpenImage = (index: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsClicked(true);
    setImageIdx(index);
  };

  const handleEditModal = () => {
    setEditModal(true);
  };

  const handleCloseSizesMenu = (event) => {
    console.log(outOfStockRef.current, event.target, "here");
    // if (!outOfStockRef.current) setIsOpen(false);
    if (
      sizesRef.current &&
      !(sizesRef.current as HTMLDivElement).contains(event.target) &&
      outOfStockRef.current &&
      !(outOfStockRef.current as HTMLDivElement).contains(event.target)
    ) {
      setIsOpen(false);
    }
    // else if (
    //   !sizesRef.current
    //   // &&
    //   // (sizesRef.current as HTMLDivElement).contains(event.target as HTMLElement)
    // )
    //   setIsOpen(false);
  };
  return {
    product,
    editModal,
    sizesSet,
    quantityArr,
    outOfStockRef,
    sizesRef,
    imageIdx,
    zoomed,
    isClicked,
    isOpen,
    setIsOpen,
    handleImageClick,
    handleSwitchModalImageLeft,
    handleSwitchModalImageRight,
    handleCloseModal,
    handleOpenImage,
    handleEditModal,
    handleCloseSizesMenu,
    handleZoom,
  };
};

export { useProduct };
