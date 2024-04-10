import "../styles/register.css";
import {
  useRef,
  useEffect,
  useState,
  LegacyRef,
  MutableRefObject,
} from "react";
import React from "react";

const Register = () => {
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
  const [emptyField, setEmptyField] = useState<string[]>([
    "valid",
    "valid",
    "valid",
    "valid",
    "valid",
  ]);
  let registerData: Array<{
    name: string;
    ref: LegacyRef<string | undefined>;
    type: string;
  }> = [
    { name: "First Name", ref: firstName, type: "text" },
    { name: "Last Name", ref: lastName, type: "text" },
    { name: "Email", ref: email, type: "email" },
    { name: "Password", ref: password, type: "password" },
    { name: "Confirm Password", ref: confirmPassword, type: "password" },
  ];
  async function HandleSubmit(event) {
    // token: JWT(username) -> hash -> hashed_username
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

  useEffect(() => {
    setEmptyField((prev) => {
      const updatedEmptyField = [...prev]; // Create a copy of the previous state
      for (let i = 0; i < isEmpty.length; i++) {
        if (isEmpty[i]) {
          updatedEmptyField[i] = "invalid";
        } else {
          updatedEmptyField[i] = "valid";
        }
      }
      console.log("Updated emptyField", updatedEmptyField);
      return updatedEmptyField; // Return the updated state
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
        <div className="register-main">
          <div className="register-container">
            {/**naprei register i login-container za margin-bottom za da mahnesh texta  */}
            {registerData.map(
              (
                field: {
                  name: string;
                  ref: LegacyRef<string | undefined>;
                  type: string;
                },
                index: number
              ) => (
                <div className="register-data">
                  <label>{field.name}</label>
                  <input
                    ref={field.ref as LegacyRef<HTMLInputElement>}
                    type={field.type}
                    className={"register-fields-" + emptyField[index]}
                    onBlur={() => {
                      (field.ref! as any).current &&
                        handleEmptyField(
                          (field.ref! as any).current.value,
                          index
                        );
                    }}
                  />
                  {emptyField[index] == "invalid" && (
                    <label className="invalid-field">Field is required</label>
                  )}
                </div>
              )
            )}
            <div className="register-data">
              <input
                type="submit"
                className="register-fields-valid register-data-submit"
                value="CREATE ACCOUNT"
              ></input>
            </div>
            <div className="already-member-paragraph">
              <span>Already a member?</span>
              <button className="already-member-button">Log in</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
