import React, { useState, useContext, useEffect } from "react";
import Register from "./Register.tsx";
import Login from "./Login.tsx";
import { ProductContext } from "./Context.tsx";
import "../styles/auth.css";

const Auth = () => {
  const { loginOrRegister, setLoginOrRegister, setAuthModal } =
    useContext(ProductContext);
  const [underline, setUnderline] = useState<string[]>(["", ""]);

  function closeModal() {
    document.body.classList.remove("modal-open");
  }

  useEffect(() => {
    loginOrRegister
      ? setUnderline((prev) => {
          prev = [...underline];
          prev = ["authentication-option-underlined", ""];
          return prev;
        })
      : setUnderline((prev) => {
          prev = [...underline];
          prev = ["", "authentication-option-underlined"];
          return prev;
        });
  }, [loginOrRegister]);

  return (
    <div className="authentication-background">
      <div className="authentication-wrapper">
        <button
          className="close-authentication-modal"
    onClick={() => {
      setAuthModal(false);
      closeModal();
    }}
        >
          x
        </button>
        <div className="authentication-content-frame">
          <div className="authentication-options">
            <div
              className={"authentication-option " + underline[0]}
              onClick={() => {
                setLoginOrRegister(true);
              }}
            >
              LOG IN
            </div>
            <div
              className={"authentication-option " + underline[1]}
              onClick={() => {
                setLoginOrRegister(false);
              }}
            >
              CREATE ACCOUNT
            </div>
          </div>
          {loginOrRegister ? <Login /> : <Register />}
        </div>
      </div>
    </div>
  );
};

export default Auth;
