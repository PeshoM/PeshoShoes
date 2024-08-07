import React, { useEffect, useState, useRef, LegacyRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/auth.css";

const PasswordReset = () => {
  const [searchParams] = useSearchParams();
  const newPassword = useRef<HTMLInputElement>();
  const [incorrectField, setIncorrectField] = useState<string>("valid");
  const [passwordTooShort, setPasswordTooShort] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isValidToken, setIsValidToken] = useState<boolean>(true);
  const { t } = useTranslation();

  useEffect(() => {
    const token = searchParams.get("token") as string;
    const checkToken = async (token: string) => {
      const url: string = `${process.env.REACT_APP_URL}/passwordReset?token=${token}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        return res.json();
      });
      if(response.message !== "success") setIsValidToken(false);

    };
    checkToken(token);
  }, []);

  const handleSubmit = (event) => {
    if (isEmpty || passwordTooShort || !isValidToken) return;
    event.preventDefault();
    const resetPassword = async () => {
      const url: string = `${process.env.REACT_APP_URL}/passwordReset`;
      console.log("url", url)
      const token = (searchParams.get("token") as string);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPassword: (newPassword.current as HTMLInputElement).value,
          token,
        }),
      }).then((res) => {
        return res.json();
      });
      console.log("reset password", response);
    };
    resetPassword();
  };

  const handleIncorrectPassword = (password: string) => {
    setIsEmpty(password == "");
    setPasswordTooShort(password.length < 5);
  };

  useEffect(() => {
    setIncorrectField(() => {
      return isEmpty || passwordTooShort ? "invalid" : "valid";
    });
  }, [isEmpty, passwordTooShort]);

  return (
    <div>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
          return event.preventDefault();
        }}
      >
        <div className="authentication-background">
          <div className="forgotten-wrapper">
            <div className="forgotten-password-text">
              <p>NEW PASSWORD</p>
            </div>
            <div className="send-email-to-reset">
              <p>Enter your new password we'll change your password.</p>
            </div>
            <div className="register-container">
              <div className="register-data">
                <label>{t("New password")}</label>
                <input
                  ref={newPassword as LegacyRef<HTMLInputElement>}
                  type="password"
                  className={"register-fields-" + incorrectField}
                  onBlur={() => {
                    (newPassword! as any).current &&
                      handleIncorrectPassword(
                        (newPassword! as any).current.value
                      );
                  }}
                />
                {isEmpty && (
                  <label className="invalid-field">
                    {t("Field is required")}
                  </label>
                )}
                {passwordTooShort && !isEmpty && (
                  <label className="invalid-field">
                    {t("Minimum is 5 characters")}
                  </label>
                )}
              </div>

              <div className="register-data">
                <input
                  type="submit"
                  className="register-fields-valid register-data-submit"
                  value={t("SUBMIT")}
                ></input>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PasswordReset;
