import "../../styles/login.css";
import React, { useRef, useState, useEffect, LegacyRef } from "react";
import { useLogin } from "./useLogin.ts";

const Login = () => {
  const { isEmpty, handleEmptyField, HandleSubmit } = useLogin();
  const email = useRef<string>();
  const password = useRef<string>();
  const [emptyField, setEmptyField] = useState<string[]>(["valid", "valid"]);
  let loginData: Array<{
    name: string;
    ref: LegacyRef<string | undefined>;
    type: string;
  }> = [
    { name: "Email", ref: email, type: "text" },
    { name: "Password", ref: password, type: "password" },
  ];

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
        <div className="">
          <div className="register-container">
            {loginData.map(
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
            <div className="forgotten-password">
              <span>Forgotten your password?</span>
            </div>
            <div className="already-member-paragraph">
              <span>New customer?</span>
              <button className="already-member-button">Register</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
