import "../../styles/register.css";
import React, { useRef, useEffect, useState, LegacyRef } from "react";
import { useRegister } from "./useRegister.ts";
const Register = () => {
  const { firstName, lastName, email, password, confirmPassword, isEmpty, HandleSubmit, handleEmptyField } = useRegister();
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

  useEffect(() => {
    setEmptyField((prev) => {
      const updatedEmptyField = [...prev];
      for (let i = 0; i < isEmpty.length; i++) {
        if (isEmpty[i]) {
          updatedEmptyField[i] = "invalid";
        } else {
          updatedEmptyField[i] = "valid";
        }
      }
      console.log("Updated emptyField", updatedEmptyField);
      return updatedEmptyField;
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
