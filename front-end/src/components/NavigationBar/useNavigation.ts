import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductContext } from "../Context.tsx";
import { user } from "../../../../back-end/src/schemas/users.schema.ts";
const useNavigation = () => {
  let location = useLocation();
  const [inputText, setInputText] = useState<string>("");
  const [userIconHovered, setUserIconHovered] = useState<boolean>(false);
  const {
    options,
    setOption,
    setProduct,
    allProducts,
    setSearchedProds,
    setLoginOrRegister,
    setAuthModal,
    registeredUser,
    setRegisteredUser,
  } = useContext(ProductContext);
  const navigate = useNavigate();

  const getRegisteredUser = async (token: string | null) => {
    const url: string = process.env.REACT_APP_URL + "/getRegisteredUser";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: token,
      }),
    }).then((res) => res.json());
    console.log("registeredUser", response);
    response.registeredUser && setRegisteredUser(() => response.registeredUser);
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
    const url: string = process.env.REACT_APP_URL + "/searchInput";
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
    localStorage.setItem("auth_token", "");
    setRegisteredUser(null);
  };

  return {
    inputText,
    setInputText,
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
    getRegisteredUser,
  };
};

export { useNavigation };
