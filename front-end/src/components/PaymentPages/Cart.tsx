import React, { useEffect, useState } from "react";
import { CartItem } from "../../interfaces/productInterfaces";
import i18next from "i18next";
import "../../styles/cart.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>();
  const imagepath: string = process.env.REACT_APP_URL + "/uploads/";
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [total, setTotal] = useState<number>();
  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem("shoppingCart") as string));
  }, []);
  useEffect(() => {
    calculateTotal();
  }, [cartItems])
  const calculateTotal = () => {
    if (cartItems && cartItems.length > 0) {
      const sum = cartItems.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.price * currentItem.quantity;
      }, 0);
      setTotal(sum);
    } else {
      setTotal(0);
    }
  };
  const handleMinusQuantity = (idx: number) => {
    if (cartItems![idx].quantity == 1) return;
    setCartItems((prev) => {
      prev = [...cartItems!];
      prev[idx].quantity--;
      calculateTotal();
      return prev;
    });
  };

  const handlePlusQuantity = (idx: number) => {
    setCartItems((prev) => {
      prev = [...cartItems!];
      prev[idx].quantity++;
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

  const handleCheckout = () => {
    //you need to check how many of each size are available and make a limit for 
    //the plus option so it doesn't crash. Then make it update the products post
    //calling the func.
  }

  return (
    <div className="cart-component">
      <div className="cart-mini-navbar"></div>
      <div className="cart-steps">
        <ul className="steps">
          <li data-content="?" className="step step-neutral">
            {t("CART")}
          </li>
          <li data-content="!" className="step step-neutral">
            {t("DELIVERY AND PAYMENT")}
          </li>
          <li data-content="✓" className="step step-neutral">
            {t("USER INFORMATION")}
          </li>
          <li data-content="✕" className="step step-neutral">
            {t("SUMMARY")}
          </li>
        </ul>
      </div>
      <div className="cart-items-wrapper">
        <p className="cart-items-paragraph"> {t("YOUR ORDER")}</p>
        {cartItems && cartItems!.length > 0 ? (
          cartItems?.map((item: CartItem, idx: number) => {
            console.log(item);
            return (
              <div className="cart-items-content">
                <div className="cart-item">
                  <div className="cart-item-image-container">
                    <img
                      className="cart-item-image"
                      src={imagepath + item.image}
                      alt="prod_image"
                    />
                  </div>
                  <div className="cart-item-content">
                    <div className="cart-item-properties">
                      <div className="cart-item-title">{item.title}</div>
                      <div className="cart-item-size">
                        {t("size") + ": " + item.size}
                      </div>
                      <div className="cart-items-color">
                        {t("color") + ": " + t(`${item.color}`)}
                      </div>
                    </div>
                    <div className="cart-item-quantity-controls">
                      <div
                        className="cart-item-minus"
                        onClick={() => handleMinusQuantity(idx)}
                      >
                        -
                      </div>
                      <div className="cart-item-quantity">{item.quantity}</div>
                      <div
                        className="cart-item-plus"
                        onClick={() => handlePlusQuantity(idx)}
                      >
                        +
                      </div>
                    </div>
                    <div className="cart-item-price-container">
                      <div className="cart-item-price">
                        {item.price * item.quantity} {t("BGN")}
                      </div>
                      <div
                        className="cart-item-remove"
                        onClick={() => handleRemoveCartItem(idx)}
                      >
                        {t("Remove")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="empty-card">
            <span onClick={() => handleNavigateShopping()}>
              {t("Your card is currently empty. Go do some shopping!")}
            </span>
          </div>
        )}
        <div className="total-checkout-price">
          <div className="total-price">{t("Total price")}</div>
          <div className="total-price-tag">
            {total} {t("BGN")}
          </div>
        </div>
        <div className="checkout-options">
          <div
            className="go-back-button"
            onClick={() => handleNavigateShopping()}
          >
            {t("Go back to shop")}
          </div>
          <div className="checkout-button" onClick={() => handleCheckout}>{t("Create purchase")}</div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
