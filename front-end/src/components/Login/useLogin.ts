import { useRef, useState } from "react";

const useLogin = () => {
    const email = useRef<string>();
    const password = useRef<string>();
    const [isEmpty, setIsEmpty] = useState<boolean[]>([false, false]);
    
    const handleEmptyField = (field: string, idx: number) => {
      setIsEmpty((prev) => {
        const newEmpty = [...prev];
        newEmpty[idx] = field == "";
        return newEmpty;
      });
    };

    async function HandleSubmit(event) {
      const url: string = process.env.REACT_APP_LOGIN_URL || "";
      event.preventDefault();
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //@ts-ignore
          email: email.current.value,
          //@ts-ignore
          password: password.current.value,
        }),
      });
      response = await response.json();
      console.log(response);
      //@ts-ignore
      localStorage.setItem("auth_token", response.token.token); // make an if incase the login is wrong
      return false;
    }
    return {
      isEmpty,
      handleEmptyField,
      HandleSubmit,
    };
}

export { useLogin };