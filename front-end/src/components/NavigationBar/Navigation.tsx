import "../../styles/navigation.css";
import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import categories from "../../categories.js";
import { ProductContext } from "../Context.tsx";
import Auth from "../Auth.tsx";
import { useNavigation } from "./useNavigation.ts";

const Navigation = () => {
  // console.log("hereeee");
  let {
    inputText,
    setInputText,
    getRegisteredUser,
    handleUnderline,
    handleLeaveUnderline,
    handleChange,
    handleSearch,
    handleKeyDown,
    handleHome,
    openModal,
    closeModal,
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
  const { options, setLoginOrRegister, authModal, setAuthModal } =
    useContext(ProductContext);
  const navigate = useNavigate();
  const [userIconHovered, setUserIconHovered] = useState<boolean>(false);
  const [showInputMenu, setShowInputMenu] = useState<boolean>(false);
  const imagepath: string = process.env.REACT_APP_PRODUCT_IMAGES_PATH || "";

  return (
    <div>
      <div className="Ultranav">
        <div className="main navbar">
          <div className="nav_genders">
            <div>
              <a href="" className="nav_gender">
                Men
              </a>
            </div>
            <div>
              <a href="" className="nav_gender">
                Women
              </a>
            </div>
            <div>
              <a href="" className="nav_gender">
                Kids
              </a>
            </div>
          </div>
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
              onClick={() => {
                setLoginOrRegister(true);
                openModal();
                setAuthModal(true);
              }}
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
              <img className="icons" src="icons8-cart-96.png"></img>
            </a>
          </div>
        </div>
        <div className="navigation navbar">
          <ul className="nav_left">
            <li
              className={"MainItem_mainItem" + hovered[0]}
              onMouseEnter={() => {
                ("here on mouse enter");
                setIsShown(0);
                handleUnderline(setHovered, 0);
              }}
              onMouseLeave={() => {
                handleLeaveUnderline(setHovered, 0);
              }}
            >
              <a href="" className="MainItem_mainLink">
                New arrivals
              </a>
            </li>
            <li
              className={"MainItem_mainItem" + hovered[1]}
              onMouseEnter={() => {
                setIsShown(1);
                handleUnderline(setHovered, 1);
              }}
              onMouseLeave={() => {
                handleLeaveUnderline(setHovered, 1);
              }}
            >
              <a href="" className="MainItem_mainLink">
                Shoes
              </a>
            </li>
            <li
              className={"MainItem_mainItem" + hovered[2]}
              onMouseEnter={() => {
                setIsShown(2);
                handleUnderline(setHovered, 2);
              }}
              onMouseLeave={() => {
                handleLeaveUnderline(setHovered, 2);
              }}
            >
              <a href="" className="MainItem_mainLink">
                Clothing
              </a>
            </li>
            <li
              className={"MainItem_mainItem" + hovered[3]}
              onMouseEnter={() => {
                setIsShown(3);
                handleUnderline(setHovered, 3);
              }}
              onMouseLeave={() => {
                handleLeaveUnderline(setHovered, 3);
              }}
            >
              <a href="" className="MainItem_mainLink">
                Accessories
              </a>
            </li>
            <li
              className={"MainItem_mainItem" + hovered[4]}
              onMouseEnter={() => {
                setIsShown(4);
                handleUnderline(setHovered, 4);
              }}
              onMouseLeave={() => {
                handleLeaveUnderline(setHovered, 4);
              }}
            >
              <a href="" className="MainItem_mainLink">
                Brands
              </a>
            </li>
            <li
              className={"MainItem_mainItem" + hovered[5]}
              onMouseEnter={() => {
                setIsShown(5);
                handleUnderline(setHovered, 5);
              }}
              onMouseLeave={() => {
                handleLeaveUnderline(setHovered, 5);
              }}
            >
              <a href="" className="MainItem_mainLink">
                Sale
              </a>
            </li>
          </ul>
          <div className="nav_right">
            {userIconHovered && (
              <div
                className="userHoverMenu"
                onMouseOver={() => setUserIconHovered(true)}
                onMouseLeave={() => setUserIconHovered(false)}
                onClick={() => {
                  setAuthModal(true);
                  setUserIconHovered(false);
                  openModal();
                }}
              >
                <div className="register-login-container">
                  <button
                    className="login-button"
                    onClick={() => {
                      setAuthModal(true);
                      setUserIconHovered(false);
                      openModal();
                      setLoginOrRegister(true);
                    }}
                  >
                    LOG IN
                  </button>
                  <div className="register-text-paragraph">
                    <span>New customer?</span>
                    <button
                      className="register-button"
                      onClick={() => {
                        setAuthModal(true);
                        setLoginOrRegister(false);
                      }}
                    >
                      Register
                    </button>
                  </div>
                </div>
                <div className="personal-options-container">
                  <div
                    className="personalized-option-div"
                    onClick={setLoginOrRegister(true)}
                  >
                    <div className="personalized-option">My accout</div>
                  </div>
                  <div
                    className="personalized-option-div"
                    onClick={setLoginOrRegister(true)}
                  >
                    <div className="personalized-option">My orders</div>
                  </div>
                  <div
                    className="personalized-option-div"
                    onClick={setLoginOrRegister(true)}
                  >
                    <div className="personalized-option">Discount codes</div>
                  </div>
                  <div
                    className="personalized-option-div"
                    onClick={setLoginOrRegister(true)}
                  >
                    <div className="personalized-option">My benefits</div>
                  </div>
                </div>
              </div>
            )}
            <div className="wrap">
              <div className="search">
                <input
                  onChange={(e) => {
                    setShowInputMenu(true);
                    setInputText(e.target.value);
                    handleChange(e);
                    // console.log(inputText);
                  }}
                  onFocus={() => setShowInputMenu(true)}
                  onBlur={() => setShowInputMenu(false)}
                  onKeyDown={handleKeyDown}
                  type="text"
                  className="searchTerm"
                  placeholder="What are you looking for?"
                  value={inputText}
                />
                <button
                  type="submit"
                  className="searchButton"
                  onClick={() => {
                    handleSearch();
                    location.pathname != "/DisplayProd" &&
                      navigate("/DisplayProd");
                  }}
                >
                  <img src="icons8-search-500.png" />
                </button>
              </div>
              <div className="searchProducts">
                <ul>
                  {inputText.length > 0 &&
                    showInputMenu &&
                    options.map((product, index: number) => (
                      <>
                        {product.colorVariations.map(
                          (colorVar, idx: number) => (
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
                    ))}
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
              categories[isShown].map((category, idx: number) => {
                return (
                  <div className="columns_Hovered_Children">
                    <div className="columns_Elements_Hovered_Children">
                      {Object.keys(category).map((titles, idx: number) => {
                        // {}[i] -> titles
                        return (
                          <div>
                            <div>
                              <div className="titles_Hovered_Children">
                                {titles}
                              </div>
                            </div>
                            <div>
                              {/*@ts-ignore*/}
                              {Object.values(category)[idx].map((element) => {
                                // console.log(element);
                                return (
                                  <a
                                    href={element.url}
                                    className="nav_bar_Hovered_Elements"
                                  >
                                    {element.name}
                                  </a>
                                );
                              })}
                            </div>
                          </div>
                        );
                        //
                      })}
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
