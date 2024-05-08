import { useEffect, useState } from "react";
import { CartItem } from "../../interfaces/productInterfaces";
import { useNavigate } from "react-router-dom";

const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>();
  const navigate = useNavigate();
  const [total, setTotal] = useState<number>();

  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem("shoppingCart") as string));
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [cartItems]);

  const calculateTotal = () => {
    if (cartItems && cartItems.length > 0) {
      const sum = cartItems.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.price * currentItem.quantity;
      }, 0);
      setTotal(parseFloat(sum.toFixed(2)));
    } else {
      setTotal(0);
    }
  };
  const handleMinusQuantity = (idx: number) => {
    if (cartItems![idx].quantity == 1) return;
    setCartItems((prev) => {
      prev = [...cartItems!];
      prev[idx].quantity--;
      localStorage.setItem("shoppingCart", JSON.stringify(prev));
      calculateTotal();
      return prev;
    });
  };

  const handlePlusQuantity = (idx: number) => {
    if (cartItems![idx].quantity == cartItems![idx].availableQuantity) return;
    setCartItems((prev) => {
      prev = [...cartItems!];
      prev[idx].quantity++;
      localStorage.setItem("shoppingCart", JSON.stringify(prev));
      calculateTotal();
      return prev;
    });
  };

  const handleRemoveCartItem = (idx: number) => {
    setCartItems((prev) => {
      const updatedCartItems = [...prev!];
      updatedCartItems.splice(idx, 1);
      localStorage.setItem("shoppingCart", JSON.stringify(updatedCartItems));
      return updatedCartItems;
    });
  };

  const handleNavigateShopping = () => {
    navigate("/");
  };

  const handleCheckout = async () => {
    if (cartItems!.length == 0) return;
    const url: string = process.env.REACT_APP_URL + "/checkout";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartItems,
      }),
    }).then((res) => res.json());
    console.log(response.cartItems);
    setCartItems(response.cartItems);
    localStorage.setItem("shoppingCart", JSON.stringify(response.cartItems));
    navigate("/PaymentSuccess");
  };

  const handleChangeQuantity = (e, idx: number) => {
    setCartItems((prev) => {
      prev = [...cartItems!];
      e.target.value <= prev[idx].availableQuantity
        ? (prev[idx].quantity = e.target.value)
        : (prev[idx].quantity = prev[idx].availableQuantity);
      localStorage.setItem("shoppingCart", JSON.stringify(prev));
      return prev;
    });
  };

  const handleClearCart = () => {
    setCartItems((prev) => {
      prev = [...cartItems!];
      prev = [];
      localStorage.setItem("shoppingCart", JSON.stringify(prev));
      return prev;
    });
  };

  return {
    total,
    cartItems,
    handleMinusQuantity,
    handlePlusQuantity,
    handleRemoveCartItem,
    handleNavigateShopping,
    handleCheckout,
    handleChangeQuantity,
    handleClearCart,
  };
};

export { useCart };
