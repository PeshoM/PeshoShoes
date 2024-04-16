import { useRef, useState, useContext } from "react";
import { ProductContext } from "../Context.tsx";
import { useNavigation } from "../NavigationBar/useNavigation.ts";

const useRegister = () => {
  const firstName = useRef<HTMLInputElement>();
  const lastName = useRef<HTMLInputElement>();
  const password = useRef<HTMLInputElement>();
  const confirmPassword = useRef<HTMLInputElement>();
  const email = useRef<HTMLInputElement>();
  const [isEmpty, setIsEmpty] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [isTooLong, setIsTooLong] = useState<boolean[]>([false, false]);
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [passwordTooShort, setPasswordTooShort] = useState<boolean[]>([
    false,
    false,
  ]);
  const { setAuthModal } = useContext(ProductContext);
  const { getRegisteredUser } = useNavigation();
  interface token extends Response {
    token?: string;
  }

  async function HandleSubmit(event) {
    for (let i: number = 0; i < 4; i++) {
      if (
        isEmpty[i] ||
        isTooLong[i] ||
        passwordTooShort[i] ||
        !isValidEmail ||
        password.current!.value != confirmPassword.current!.value
      )
        return;
    }
    const url: string = process.env.REACT_APP_URL + "/register";
    event.preventDefault();
    let response: token = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName.current?.value,
        lastName: lastName.current?.value,
        pass: password.current?.value,
        email: email.current?.value,
        role: "user",
      }),
    });
    response = await response.json();
    if (response) {
      (() => {
        closeModal();
        setAuthModal(false);

        localStorage.setItem("auth_token", response.token!);
        getRegisteredUser(localStorage.getItem("auth_token"));
      })();
    }
  }

  const handleIncorrectField = (field: string, idx: number) => {
    setIsEmpty((prev) => {
      const newEmpty = [...prev];
      newEmpty[idx] = field == "";
      return newEmpty;
    });
    if (idx <= 1) {
      setIsTooLong((prev) => {
        const newTooLong = [...prev];
        newTooLong[idx] = field.length > 32;
        return newTooLong;
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    idx == 2 && setIsValidEmail(emailRegex.test(field));
    if (idx >= 3) {
      setPasswordTooShort((prev) => {
        const newTooShort = [...prev];
        newTooShort[idx - 3] = field.length < 5;
        return newTooShort;
      });
    }
  };

  function closeModal() {
    document.body.classList.remove("modal-open");
  }

  return {
    isEmpty,
    isTooLong,
    isValidEmail,
    passwordTooShort,
    firstName,
    lastName,
    password,
    confirmPassword,
    email,
    HandleSubmit,
    handleIncorrectField,
  };
};

export { useRegister };
