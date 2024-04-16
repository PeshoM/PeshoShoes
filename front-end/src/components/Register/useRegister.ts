import { useRef, useState } from "react";
const useRegister = () => {
  const firstName = useRef<string>();
  const lastName = useRef<string>();
  const password = useRef<string>();
  const confirmPassword = useRef<string>();
  const email = useRef<string>();
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
  interface token extends Response {
    token?: string;
  }

  async function HandleSubmit(event) {
    const url: string = process.env.REACT_APP_REGISTER_URL || "";
    event.preventDefault();
    let response: token = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //@ts-ignore
        firstName: firstName.current.value,
        //@ts-ignore
        lastName: lastName.current.value,
        //@ts-ignore
        pass: password.current.value,
        //@ts-ignore
        email: email.current.value,
        role: "user",
      }),
    });
    response = await response.json();
    localStorage.setItem("auth_token", response.token!);
    return false;
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
        newTooShort[idx-3] = field.length < 5;
        return newTooShort;
      });
    }
  };

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
