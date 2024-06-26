import React from "react";
import { useContext } from "react";
import Navigation from "../NavigationBar/Navigation.tsx";
import Footer from "../Footer.tsx";
import "../../styles/product.css";
import { useProduct } from "./useProduct.ts";
import Dropdown from "../Dropdown.tsx";
import { ProductContext } from "../Context.tsx";
import EditProd from "../EditProduct/EditProd.tsx";
import { ColorVariation } from "../../interfaces/productInterfaces.ts";
import { useTranslation } from "react-i18next";

const Product: React.FC = () => {
  const {
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
  } = useProduct();
  const { registeredUser } = useContext(ProductContext);
  let leaveForNow: undefined = undefined;
  const imagepath: string = process.env.REACT_APP_URL + "/uploads/";
  const { t } = useTranslation();

  return (
    <div onClick={(event) => handleCloseSizesMenu(event)}>
      {isClicked && (
        <div className="picture-modal-background">
          <div
            className="picture-modal-btn"
            onClick={() => handleSwitchModalImageLeft()}
          >
            {"<"}
          </div>
          <img
            src={imagepath + product?.colorVariations[0].images[imageIdx]}
            alt="Your Image"
            className={`modal-picture ${zoomed ? "zoomed" : ""}`}
            onClick={() => handleZoom()}
          />
          <div
            className="picture-modal-btn"
            onClick={() => handleSwitchModalImageRight()}
          >
            {">"}
          </div>
          <div
            className="picture-modal-cancel"
            onClick={() => handleCloseModal()}
          >
            X
          </div>
          <div className="picture-modal-info">
            {imageIdx + 1}/{product?.colorVariations[0].images.length}
          </div>
        </div>
      )}
      {editModal && (
        <div className="edit-product-modal">
          <EditProd product={product!} />
        </div>
      )}
      <Navigation />
      <div className="product-info-and-options">
        <div className="product-pictures">
          <div className="grid-container">
            {product &&
              product.colorVariations[0].images.map((image, index) => (
                <img
                  className={"product-images pic" + index}
                  src={imagepath + image}
                  onClick={() => handleOpenImage(index)}
                />
              ))}
          </div>
        </div>
        <div className="product-options">
          {registeredUser && registeredUser.role == "admin" && (
            <div className="admin-delete-edit-product">
              <button onClick={() => handleEditModal()}>{t('Edit product')}</button>
              <button onClick={() => handleDeleteProduct(product!._id)}>
                {t('Delete product')}
              </button>
            </div>
          )}
          <div className="product-title">{product?.title}</div>
          <div className="product-color">
          
            {t(product?.colorVariations[0].color as string)}
          </div>
          {/* add review displays after the whole this is done */}
          {leaveForNow && (
            <div className="rating rating-md">
              <input
                type="radio"
                name="rating-7"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-7"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-7"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-7"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-7"
                className="mask mask-star-2 bg-orange-400"
              />
            </div>
          )}
          <div className="product-price">
            {product?.colorVariations[0].price}{t('BGN')}
          </div>
          <p className="color-options">{t('Color Options')}
          </p>
          <div className="shoe-variations-container">
            {product?.colorVariations.map(
              (colorVar: ColorVariation, index: number) => (
                <div
                  className={"pic-choices pic-option" + index}
                  onClick={() => {
                    handleImageClick(index);
                  }}
                >
                  <img
                    className="product-variation-images"
                    alt=""
                    src={imagepath + colorVar.images[2]}
                  />
                </div>
              )
            )}
          </div>
          <div className="product-sizes">
            <div className="sizes-div">
              <p className="sizes-titles">{t('Avaiable sizes')}</p>
              <div
                tabIndex={0}
                className="product-sizes-menu collapse collapse-arrow border border-base-250 bg-base-200"
              >
                <Dropdown
                  outOfStockRef={outOfStockRef}
                  sizesRef={sizesRef}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  sizesSet={sizesSet}
                  quantityArr={quantityArr}
                  selectedSize={selectedSize}
                  setSelectedSize={setSelectedSize}
                />
              </div>
            </div>
          </div>
          <div className="add-to-cart-container" onClick={() => handleAddToCart(product!, selectedSize)}>
            {t('ADD TO CART')}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Product;
