import React from "react";
import { CartItem } from "../../interfaces/productInterfaces";
import "../../styles/cart.css";
import { useTranslation } from "react-i18next";
import { useCart } from "./useCart.ts";

const Cart: React.FC = () => {
  const imagepath: string = process.env.REACT_APP_URL + "/uploads/";
  const { t } = useTranslation();
  const {
    total,
    cartItems,
    handleMinusQuantity,
    handlePlusQuantity,
    handleRemoveCartItem,
    handleNavigateShopping,
    handleCheckout,
    handleChangeQuantity,
    handleClearCart,
  } = useCart();

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
        <div className="cart-items-wrapper-top">
          <p className="cart-items-paragraph"> {t("YOUR ORDER")}</p>
          <button className="cart-items-clear" onClick={() => handleClearCart()}>
            {t("Clear cart")}
          </button>
        </div>
        {cartItems && cartItems!.length > 0 ? (
          cartItems?.map((item: CartItem, idx: number) => {
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
                      <div className="cart-item-quantity">
                        <input
                          type="number"
                          step="none"
                          className="checkout-quantity-input"
                          value={item.quantity}
                          onChange={(e) => handleChangeQuantity(e, idx)}
                        />
                      </div>
                      <div
                        className="cart-item-plus"
                        onClick={() => handlePlusQuantity(idx)}
                      >
                        +
                      </div>
                    </div>
                    <div className="cart-item-price-container">
                      <div className="cart-item-price">
                        {parseFloat((item.price * item.quantity) as unknown as string).toFixed(2)} {t("BGN")}
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
          <div className="checkout-button" onClick={() => handleCheckout()}>
            {t("Create purchase")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
