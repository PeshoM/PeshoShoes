import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductContext } from "../Context.tsx";
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
    // console.log("registeredUser", response);
    response.registeredUser && setRegisteredUser(() => response.registeredUser);
    // console.log(response.registeredUser);
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
    // console.log("typed:", lowerCase);
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
    if (options.length <= 0 || !options) return;

    // Convert options to a JSON string
    const optionsString = JSON.stringify(options);
    console.log("Options string:", optionsString); // Debug statement

    const queryParams = { options: optionsString };
    const searchParams = new URLSearchParams(queryParams);
    const newUrl = `/?${searchParams.toString()}`;
    console.log("New URL:", newUrl); // Debug statement

    // Change the URL without causing a page refresh
    window.history.pushState({ path: newUrl }, "", newUrl);

    // Set state with the search results
    setProduct(options);
    setSearchedProds(options);

    // Debug: Log the search results
    console.log("Search results:", options);
    // Call parseOptionsFromUrl after setting the options
    parseOptionsFromUrl();
  };

  const parseOptionsFromUrl = () => {
    // Parse options from the URL
    const urlSearchParams = new URLSearchParams(window.location.search);
    const optionsString = urlSearchParams.get("options");

    // Parse optionsString into an array
    const options = optionsString
      ? JSON.parse(decodeURIComponent(optionsString))
      : null;

    // Log or use options
    console.log("Options from URL:", options);
    // Or do something else with options
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      if (options == "" || !options) return;
      handleSearch();
      // console.log(location.pathname);
      setInputText("");
      location.pathname != "/" && navigate("/");
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

  const handleClickNavigateUrl = async () => {
    const url: string = process.env.REACT_APP_URL + "/clickedNavigationUrl";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
  };
  const handleSearchQueryParams = (searchResults) => {
    const queryParams = { searchResults };
    const searchParams = new URLSearchParams(queryParams);
    const newUrl = `/?${searchParams.toString()}`;

    // Change the URL without causing a page refresh
    window.history.pushState({ path: newUrl }, "", newUrl);
    console.log("search results not stringified", searchResults);
    console.log("Search results:", JSON.stringify(searchResults));
  };
  const handleClickNavUrl = (title: string, name: string) => {
    const queryParams = { title, name };
    const searchParams = new URLSearchParams(queryParams);
    const url = `/?${searchParams.toString()}`;
    window.location.href = url;
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
    handleClickNavUrl,
  };
};

export { useNavigation };
