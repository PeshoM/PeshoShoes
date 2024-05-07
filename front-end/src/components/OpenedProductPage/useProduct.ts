import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  CartItem,
  ColorVariation,
  Prod,
} from "../../interfaces/productInterfaces";

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
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  useEffect(() => {
    let fetchProduct = async (titleParam: string, colorParam: string) => {
      const url: string = `${
        process.env.REACT_APP_URL
      }/fetchProduct?title=${encodeURIComponent(
        titleParam
      )}&color=${encodeURIComponent(colorParam)}`;
      console.log(searchParams.toString());
      let response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        return res.json();
      });
      setProduct(response.product);
      setSizesSet(new Set<number>(response.product.colorVariations[0].sizes));
      setQuantityArr(response.product.colorVariations[0].quantity);
    };
    fetchProduct(title!, color!);
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
      brand: "",
      colorVariations: [
        { images: [], price: 0, quantity: [], sizes: [], color: "" },
      ],
      season: "",
      gender: "",
      category: "",
      sport: "",
      _id: "",
    };
    obj.title = product!.title;
    obj.description = product!.description;
    obj.description = product!.brand;
    obj.colorVariations = newArr;
    obj.season = product!.season;
    obj.gender = product!.gender;
    obj.category = product!.category;
    obj.sport = product!.sport;
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
    // console.log(outOfStockRef.current, event.target, "here");
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

  const handleDeleteProduct = async (id: string) => {
    const url: string = `${process.env.REACT_APP_URL}/products/${id}`;
    fetch(url, {
      method: "DELETE",
    }).then(() => navigate("/"));
  };

  const handleAddToCart = (product: Prod, size: number | null) => {
    if (!size) {
      setIsOpen(true);
      return;
    }
    // Step 1: Retrieve existing shopping cart data from local storage
    const existingCartData =
      JSON.parse(localStorage.getItem("shoppingCart") as string) || [];

    // Step 2: Check if the product already exists in the cart
    let found = false;
    for (let i = 0; i < existingCartData.length; i++) {
      const existingItem = existingCartData[i];
      if (existingItem._id === product._id) {
        // If the product already exists, update its quantity
        existingItem.quantity++;
        found = true;
        break;
      }
    }
    if (!found) {
      const newCartItem = {
        _id: product._id,
        title: product.title,
        description: product.description,
        brand: product.brand,
        image: product.colorVariations[0].images[0],
        price: product.colorVariations[0].price,
        size,
        quantity: 1,
        color: product.colorVariations[0].color,
        season: product.season,
        gender: product.gender,
        category: product.category,
        sport: product.sport,
      } as CartItem;
      existingCartData.push(newCartItem);
    }
    localStorage.setItem("shoppingCart", JSON.stringify(existingCartData));
    console.log("cart", existingCartData);
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
    selectedSize,
    setSelectedSize,
    setIsOpen,
    handleImageClick,
    handleSwitchModalImageLeft,
    handleSwitchModalImageRight,
    handleCloseModal,
    handleOpenImage,
    handleEditModal,
    handleCloseSizesMenu,
    handleZoom,
    handleDeleteProduct,
    handleAddToCart,
  };
};

export { useProduct };
