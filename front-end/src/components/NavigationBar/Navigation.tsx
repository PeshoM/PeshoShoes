import "../../styles/navigation.css";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import categories from "../../categories.js";
import { ProductContext } from "../Context.tsx";
import Auth from "../Auth.tsx";
import { useNavigation } from "./useNavigation.ts";

const Navigation: React.FC = () => {
  // console.log("hereeee");
  let {
    inputText,
    registeredUser,
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
    handleOpenLogin,
    handleOpenRegister,
    handleLogOut,
  } = useNavigation();
  //2 funcs above do not work bc of useContext Product type
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
  let userOptionsArr: string[] = [
    "My account",
    "My orders",
    "Discount codes",
    "My benefits",
  ];
  let navBarOptionsArr: string[] = [
    "New arrivals",
    "Shoes",
    "Clothing",
    "Accessories",
    "Brands",
    "Sale",
  ];
  useEffect(() => {
    console.log(localStorage.getItem("auth_token"));
    getRegisteredUser(localStorage.getItem("auth_token"));
  }, []);

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
              <img className="icons" src="icons8-cart-96.png"></img>
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
                  {navBarOption}
                </a>
              </li>
            ))}
          </ul>
          <div className="nav_right">
            {userIconHovered && (
              <div
                className="userHoverMenu"
                onMouseOver={() => setUserIconHovered(true)}
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
                      LOG IN
                    </button>
                    <div className="register-text-paragraph">
                      <span>New customer?</span>
                      <button
                        className="register-button"
                        onClick={() => handleOpenRegister()}
                      >
                        Register
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
                      <div className="personalized-option">{option}</div>
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
