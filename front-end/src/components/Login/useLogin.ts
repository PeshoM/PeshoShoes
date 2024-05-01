import { useRef, useState, useContext } from "react";
import { ProductContext } from "../Context.tsx";
import { useNavigation } from "../NavigationBar/useNavigation.ts";

const useLogin = () => {
  const email = useRef<HTMLInputElement>();
  const password = useRef<HTMLInputElement>();
  const [isEmpty, setIsEmpty] = useState<boolean[]>([false, false]);
  const [passwordTooShort, setPasswordTooShort] = useState<boolean>();
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const { setAuthModal, setLoginOrRegister } = useContext(ProductContext);
  const { getRegisteredUser } = useNavigation();
  interface token extends Response {
    token: string;
  }

  async function HandleSubmit(event) {
    for (let i: number = 0; i < 1; i++) {
      if (isEmpty[i] || passwordTooShort || !isValidEmail) return;
    }
    const url: string = process.env.REACT_APP_URL + "/login";
    event.preventDefault();
    let response: token = (await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.current?.value,
        password: password.current?.value,
      }),
    })) as token;
    response = await response.json();
    console.log(response);
    if (response)
      (() => {
        closeModal();
        setAuthModal(false);

        localStorage.setItem("auth_token", response.token);
        getRegisteredUser(localStorage.getItem("auth_token"))
      })();
  }

  const handleIncorrectField = (field: string, idx: number) => {
    setIsEmpty((prev) => {
      const newEmpty = [...prev];
      newEmpty[idx] = field == "";
      return newEmpty;
    });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    idx == 0 && setIsValidEmail(emailRegex.test(field));
    if (idx == 1) setPasswordTooShort(field.length < 5);
  };

  function closeModal() {
    document.body.classList.remove("modal-open");
  }

  const handleRegister = () => {
    setLoginOrRegister(false);
  }

  return {
    password,
    email,
    isEmpty,
    isValidEmail,
    passwordTooShort,
    handleIncorrectField,
    HandleSubmit,
    handleRegister
  };
};

export { useLogin };
