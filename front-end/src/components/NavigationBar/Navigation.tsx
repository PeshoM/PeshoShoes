import "../../styles/navigation.css";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import categories from "../../categories.js";
import { ProductContext } from "../Context.tsx";
import Auth from "../Auth.tsx";
import { useNavigation } from "./useNavigation.ts";
import { useTranslation } from "react-i18next";
import { ColorVariation } from "../../interfaces/productInterfaces.ts";

const Navigation: React.FC = () => {
  // console.log("hereeee");
  let {
    inputText,
    setInputText,
    handleUnderline,
    handleLeaveUnderline,
    handleChange,
    handleSearch,
    handleKeyDown,
    handleHome,
    closeModal,
    handleOpenLogin,
    handleOpenRegister,
    handleLogOut,
    getRegisteredUser,
    handleClickNavUrl,
    handleNavigateCart,
  } = useNavigation();
  let location = useLocation();
  const [hovered, setHovered] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [isShown, setIsShown] = useState<number>(-1);
  const {
    options,
    authModal,
    setAuthModal,
    registeredUser,
    setRegisteredUser,
  } = useContext(ProductContext);
  const navigate = useNavigate();
  const [userIconHovered, setUserIconHovered] = useState<boolean>(false);
  const [showInputMenu, setShowInputMenu] = useState<boolean>(false);
  const imagepath: string = process.env.REACT_APP_URL + "/uploads/";
  let userOptionsArr: string[] = [
    "My account",
    "My orders",
    "Discount codes",
    "My benefits",
  ];
  let navBarOptionsArr: string[] = ["Shoes", "Brands", "Sale"];
  const { t } = useTranslation();

  useEffect(() => {
    getRegisteredUser(localStorage.getItem("auth_token"));
  }, []);

  return (
    <div>
      <div className="Ultranav">
        <div className="main navbar">
          <div
            className="navbar-center"
            onClick={() => {
              handleHome();
            }}
          >
            <a className="nav_logo " href="">
              <img
                className="shop_logo"
                src="/output-onlinepngtools (2).png"
              ></img>
            </a>
          </div>
          <div className="nav_icons">
            <button
              onClick={() => !registeredUser && handleOpenLogin()}
              onMouseOver={() => setUserIconHovered(true)}
              onMouseLeave={() => setUserIconHovered(false)}
              className="UserIcon_userButton"
            >
              <img className="icons" src="/icons8-manager-96.png"></img>
            </button>
            <button className="NotificationIcon_notificationIcon"> </button>
            <a href="" className="CustomerListIcon_wishIcon">
              <img className="icons" src="/icons8-heart-96.png"></img>
            </a>
            <a href="" className="CartIcon_cartIcon">
              <img
                className="icons"
                src="icons8-cart-96.png"
                onClick={() => handleNavigateCart()}
              ></img>
            </a>
          </div>
        </div>
        <div className="navigation navbar">
          <ul className="nav_left">
            {navBarOptionsArr.map((navBarOption: string, idx: number) => (
              <li
                className={"MainItem_mainItem" + hovered[idx]}
                onMouseEnter={() => {
                  setIsShown(idx);
                  handleUnderline(setHovered, idx);
                }}
                onMouseLeave={() => {
                  handleLeaveUnderline(setHovered, idx);
                }}
              >
                <a href="" className="MainItem_mainLink">
                  {t(navBarOption)}
                </a>
              </li>
            ))}
          </ul>
          <div className="nav_right">
            {userIconHovered && (
              <div
                className="userHoverMenu"
                onMouseOver={() => !authModal && setUserIconHovered(true)}
                onMouseLeave={() => setUserIconHovered(false)}
              >
                {registeredUser ? (
                  <div className="authorized-user-name-container">
                    <p>
                      <span>
                        {registeredUser.firstName +
                          " " +
                          registeredUser!.lastName}
                      </span>
                    </p>
                  </div>
                ) : (
                  <div className="register-login-container">
                    <button
                      className="login-button"
                      onClick={() => handleOpenLogin()}
                    >
                      {t("LOG IN")}
                    </button>
                    <div className="register-text-paragraph">
                      <span>{t("New customer")}?</span>
                      <button
                        className="register-button"
                        onClick={() => handleOpenRegister()}
                      >
                        {t("Register")}
                      </button>
                    </div>
                  </div>
                )}
                <div className="personal-options-container">
                  {userOptionsArr.map((option: string, index: number) => (
                    <div
                      className="personalized-option-div"
                      onClick={() => !registeredUser && handleOpenLogin()}
                    >
                      <div className="personalized-option">{t(option)}</div>
                    </div>
                  ))}
                </div>
                {registeredUser && (
                  <div
                    className="registered-log-out-button"
                    onClick={() => handleLogOut()}
                  >
                    <p>Log out</p>
                  </div>
                )}
              </div>
            )}
            <div className="wrap">
              <div className="search">
                <input
                  onChange={(e) => {
                    setShowInputMenu(true);
                    setInputText(e.target.value);
                    handleChange(e);
                    console.log("here line 197");
                  }}
                  onFocus={() => setShowInputMenu(true)}
                  onBlur={() => setShowInputMenu(false)}
                  onKeyDown={handleKeyDown}
                  type="text"
                  className="searchTerm"
                  placeholder={`${t("What are you looking for")}?`}
                  value={inputText}
                />
                <button
                  type="submit"
                  className="searchButton"
                  onClick={() => {
                    handleSearch();
                    location.pathname != "/" && navigate("/");
                  }}
                >
                  <img src="icons8-search-500.png" />
                </button>
              </div>
              <div className="searchProducts">
                <ul>
                  {inputText.length > 0 && showInputMenu && options.length > 0
                    ? options.map((product, index: number) => (
                        <>
                          {product.colorVariations.map(
                            (colorVar: ColorVariation) => (
                              <div className="product" key={index}>
                                <img
                                  className="searchBarImages"
                                  src={imagepath + colorVar.images[0]}
                                  alt={product.title}
                                />
                                <p className="resTitles">{product.title}</p>
                                <p className="resPrices">{colorVar.price}</p>
                              </div>
                            )
                          )}
                        </>
                      ))
                    : inputText.length > 0 &&
                      showInputMenu && (
                        <>
                          <div className="no-results-input-text">
                            <p className="no-results-warning">
                              No results for "{inputText}"
                            </p>
                            <p className="spelling-error-warning">
                              Check the spelling or try a different search term.
                            </p>
                          </div>
                        </>
                      )}
                </ul>
              </div>
            </div>
          </div>
        </div>
        {isShown >= 0 && (
          <div
            className="nav_Left_Hovered_Child"
            onMouseLeave={() => {
              setIsShown(-1);
            }}
          >
            {isShown >= 0 &&
              categories[isShown].map((category) => {
                return (
                  <div className="columns_Hovered_Children">
                    <div className="columns_Elements_Hovered_Children">
                      {Object.keys(category).map(
                        (titles: string, idx: number) => {
                          // {}[i] -> titles
                          return (
                            <div>
                              <div>
                                <div className="titles_Hovered_Children">
                                  {t(titles)}
                                </div>
                              </div>
                              <div>
                                {/*@ts-ignore*/}
                                {Object.values(category)[idx].map(
                                  (element: { name: string; url: string }) => {
                                    return (
                                      <div
                                        className="nav_bar_Hovered_Elements"
                                        onClick={() => {
                                          handleClickNavUrl(
                                            titles,
                                            element.name
                                          );
                                        }}
                                      >
                                        {t(element.name)}
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {authModal && (
        <>
          <Auth />
          <div
            className="authentication-modal-container"
            onClick={() => {
              setAuthModal(false);
              closeModal();
            }}
          ></div>
        </>
      )}
    </div>
  );
};

export default Navigation;
