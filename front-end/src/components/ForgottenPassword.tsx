import React, {
  useState,
  useRef,
  LegacyRef,
  useContext,
  useEffect,
} from "react";
import { useTranslation } from "react-i18next";
import { ProductContext } from "./Context.tsx";
import "../styles/auth.css";

const ForgottenPassword = () => {
  const email = useRef<HTMLInputElement>();
  const [incorrectField, setIncorrectField] = useState<string>("valid");
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const { t } = useTranslation();
  const { setPasswordModal, setAuthModal, setLoginOrRegister } =
    useContext(ProductContext);

  const handleSubmit = (event) => {
    if (isEmpty || !isValidEmail) return;
    const url: string = process.env.REACT_APP_URL + "/forgottenPassword";
    event.preventDefault();
    const handleForgottenPassword = async () => {
      console.log(
        "hello handleForgotenpassword",
        (email.current as HTMLInputElement).value
      );
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: (email.current as HTMLInputElement).value
        })
      }).then((res) => {res.json()})
    };
    handleForgottenPassword();
  };

  const handleIncorrectEmail = (email: string) => {
    setIsEmpty(email == "");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(email));
  };

  const handleCloseForgottenPassword = () => {
    setPasswordModal(false);
  };

  const handleBackToLogin = () => {
    setAuthModal(true);
    setLoginOrRegister(true);
    setPasswordModal(false);
  };

  useEffect(() => {
    setIncorrectField(() => {
      return isEmpty || !isValidEmail ? "invalid" : "valid";
    });
  }, [isEmpty, isValidEmail]);

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
            <button
              className="close-authentication-modal"
              onClick={handleCloseForgottenPassword}
            >
              x
            </button>
            <div className="forgotten-password-text">
              <p>{t("FORGOT PASSWORD")}?</p>
            </div>
            <div className="send-email-to-reset">
              <p>{t("Enter your email and we'll send you a reset link")}.</p>
            </div>
            <div className="register-container">
              <div className="register-data">
                <label>{t("Email")}</label>
                <input
                  ref={email as LegacyRef<HTMLInputElement>}
                  type="email"
                  className={"register-fields-" + incorrectField}
                  onBlur={() => {
                    (email! as any).current &&
                      handleIncorrectEmail((email! as any).current.value);
                  }}
                />
                {isEmpty && (
                  <label className="invalid-field">
                    {t("Field is required")}
                  </label>
                )}
                {!isValidEmail && !isEmpty && (
                  <label className="invalid-field">
                    {t("Please enter a valid email address")}
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
              <div onClick={handleBackToLogin} className="forgotten-password">
                <span>{t("Back to Log in")}</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgottenPassword;
