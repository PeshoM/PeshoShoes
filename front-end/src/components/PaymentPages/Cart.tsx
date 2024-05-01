import React from "react";
import { Prod } from "../../interfaces/productInterfaces";
import "../../styles/cart.css";

const Cart: React.FC = () => {
  const product = { title: "Nike Air Force 1",
    
  }
  return (
    <div className="cart-component">
      <div className="cart-mini-navbar"></div>
      <div className="cart-steps">
        {/* <ul className="steps">
          <li data-content="?" className="step step-neutral">
            CART
          </li>
          <li data-content="!" className="step step-neutral">
            DELIVERY AND PAYMENT
          </li>
          <li data-content="✓" className="step step-neutral">
            USER INFORMATION
          </li>
          <li data-content="✕" className="step step-neutral">
            SUMMARY
          </li>
        </ul> */}
      </div>
      <div className="cart-items-wrapper">
        <p className="cart-items-paragraph"> YOUR ORDER</p>
        <div className="cart-items-content">
          <div className="cart-item">
            <div className="cart-item-image-container">
              <img className="cart-item-image" src="" alt="prod_image" />
            </div>
            <div className="cart-item-content">
              <div className="cart-item-properties">
                <div className="cart-item-title">Nike Air Force 1</div>
                <div className="cart-item-size">44.5</div>
                <div className="cart-items-color">Black</div>
              </div>
              <div className="cart-item-quantity-controls">
                <div className="cart-item-minus"></div>
                <div className="cart-item-quantity"></div>
                <div className="cart-item-plus"></div>
              </div>
              <div className="cart-item-price-container">
                <div className="cart-item-price"></div>
                <div className="cart-item-remove"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
