import "../../styles/login.css";
import React, { useState, useEffect, LegacyRef, MutableRefObject } from "react";
import { useLogin } from "./useLogin.ts";
import { useTranslation } from "react-i18next";

const Login: React.FC = () => {
  const {
    password,
    email,
    isEmpty,
    isValidEmail,
    passwordTooShort,
    handleIncorrectField,
    HandleSubmit,
    handleRegister,
  } = useLogin();
  const [incorrectField, setIncorrectField] = useState<string[]>([
    "valid",
    "valid",
  ]);
  let loginData: Array<{
    name: string;
    ref: MutableRefObject<HTMLInputElement | undefined>;
    type: string;
  }> = [
    { name: "Email", ref: email, type: "text" },
    { name: "Password", ref: password, type: "password" },
  ];
  const { t } = useTranslation();

  useEffect(() => {
    setIncorrectField((prev) => {
      const updatedIncorrectField = [...prev];
      for (let i = 0; i < isEmpty.length; i++) {
        if (
          isEmpty[i] ||
          (i == 0 && !isValidEmail) ||
          (i == 1 && passwordTooShort)
        ) {
          updatedIncorrectField[i] = "invalid";
        } else {
          updatedIncorrectField[i] = "valid";
        }
      }
      console.log("Updated incorrectField", updatedIncorrectField);
      return updatedIncorrectField;
    });
  }, [isEmpty]);

  return (
    <div>
      <form
        onSubmit={(event) => {
          HandleSubmit(event);
          return event.preventDefault();
        }}
      >
        <div className="">
          <div className="register-container">
            {loginData.map(
              (
                field: {
                  name: string;
                  ref: MutableRefObject<HTMLInputElement | undefined>;
                  type: string;
                },
                index: number
              ) => (
                <div className="register-data">
                  <label>{t(field.name)}</label>
                  <input
                    ref={field.ref as LegacyRef<HTMLInputElement>}
                    type={field.type}
                    className={"register-fields-" + incorrectField[index]}
                    onBlur={() => {
                      (field.ref! as any).current &&
                        handleIncorrectField(
                          (field.ref! as any).current.value,
                          index
                        );
                    }}
                  />
                  {isEmpty[index] && (
                    <label className="invalid-field">
                      {t("Field is required")}
                    </label>
                  )}
                  {!isValidEmail && !isEmpty[index] && index == 0 && (
                    <label className="invalid-field">
                      {t("Please enter a valid email address")}
                    </label>
                  )}
                  {passwordTooShort && index >= 1 && !isEmpty[index] && (
                    <label className="invalid-field">
                      {t("Minimum is 5 characters")}
                    </label>
                  )}
                </div>
              )
            )}
            <div className="register-data">
              <input
                type="submit"
                className="register-fields-valid register-data-submit"
                value={t("LOG IN")}
              ></input>
            </div>
            <div className="forgotten-password">
              <span>{t("Forgotten your password")}?</span>
            </div>
            <div className="already-member-paragraph">
              <span>{t("New customer")}?</span>
              <button
                className="already-member-button"
                onClick={() => handleRegister()}
              >
                {t("Register")}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
