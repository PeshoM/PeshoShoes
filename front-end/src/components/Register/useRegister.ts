import { useRef, useState } from "react";

const useRegister = () => {
    const firstName = useRef<string>();
    const lastName = useRef<string>();
    const password = useRef<string>();
    const email = useRef<string>();
    const [isEmpty, setIsEmpty] = useState<boolean[]>([
      false,
      false,
      false,
      false,
      false,
    ]);

    async function HandleSubmit(event) {
      const url: string = process.env.REACT_APP_REGISTER_URL || "";
      event.preventDefault();
      let response = await fetch(url, {
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
      //@ts-ignore
      localStorage.setItem("auth_token", response.token);
      return false;
    }

    const handleEmptyField = (field: string, idx: number) => {
      setIsEmpty((prev) => {
        const newEmpty = [...prev];
        newEmpty[idx] = field == "";
        return newEmpty;
      });
    };

    return {
        isEmpty,
        HandleSubmit,
        handleEmptyField
    }
}

export { useRegister };