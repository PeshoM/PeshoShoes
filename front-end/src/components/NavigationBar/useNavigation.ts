import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductContext } from "../Context.tsx";
import { user } from "../../../../back-end/src/schemas/users.schema.ts";
const useNavigation = () => {
  let location = useLocation();
  const [inputText, setInputText] = useState<string>("");
  const [registeredUser, setRegisteredUser] = useState<user | null>();
  const [userIconHovered, setUserIconHovered] = useState<boolean>(false);
  const {
    options,
    setOption,
    setProduct,
    allProducts,
    setSearchedProds,
    setLoginOrRegister,
    setAuthModal,
  } = useContext(ProductContext);
  const navigate = useNavigate();

  const getRegisteredUser = async (token: string | null) => {
    const url: string =
      process.env.REACT_APP_NAVIGATION_GET_REGISTERED_USER_URL || "";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: token,
      }),
    }).then((res) => res.json());
    setRegisteredUser(() => response.registeredUser);
    console.log(response.registeredUser);
  };

  const handleUnderline = (setter: Function, index: number) => {
    setter((prev) => {
      const arr = [...prev];
      arr[index] = "_Hovered";
      return arr;
    });
  };

  const handleLeaveUnderline = (setter: Function, index: number) => {
    setter((prev) => {
      const arr = [...prev];
      arr[index] = "";
      return arr;
    });
  };

  let handleChange = async (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(() => {
      return e.target.value;
    });
    console.log("typed:", lowerCase);
    const url: string = process.env.REACT_APP_NAVIGATION_SEARCH_INPUT_URL || "";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: lowerCase,
      }),
    }).then((res) => {
      return res.json();
    });
    setOption(response);
    // console.log(options, response)
  };

  let handleSearch = async () => {
    console.log("curr options", options);
    options.length > 0
      ? (() => {
          setProduct(options);
          setSearchedProds(options);
        }).call(null)
      : setProduct(allProducts);
    // setProduct(response.results)
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      options == "" || !options ? setProduct(allProducts) : handleSearch();
      console.log(location.pathname);
      setInputText("");
      location.pathname != "/DisplayProd" && navigate("/DisplayProd");
    }
  };

  const handleHome = () => {
    return navigate("/");
  };

  function openModal() {
    document.body.classList.add("modal-open");
  }

  function closeModal() {
    document.body.classList.remove("modal-open");
  }

  const handleOpenLogin = () => {
    setUserIconHovered(false);
    setAuthModal(true);
    openModal();
    setLoginOrRegister(true);
  };

  const handleOpenRegister = () => {
    setUserIconHovered(false);
    setAuthModal(true);
    openModal();
    setLoginOrRegister(false);
  };

  const handleLogOut = () => {
    localStorage.removeItem("auto_token");
    setRegisteredUser(null);
  }
  return {
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
    handleLogOut
  };
};

export { useNavigation };
