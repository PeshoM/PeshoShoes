import "../../styles/register.css";
import React, { useEffect, useState, LegacyRef, MutableRefObject } from "react";
import { useRegister } from "./useRegister.ts";
const Register: React.FC = () => {
  const { firstName, lastName, email, password, confirmPassword, isEmpty, isTooLong, isValidEmail, passwordTooShort, HandleSubmit, handleIncorrectField } = useRegister();
  const [incorrectField, setIncorrectField] = useState<string[]>([
    "valid",
    "valid",
    "valid",
    "valid",
    "valid",
  ]);
  let registerData: Array<{
    name: string;
    ref: MutableRefObject<HTMLInputElement | undefined>;
    type: string;
  }> = [
    { name: "First Name", ref: firstName, type: "text" },
    { name: "Last Name", ref: lastName, type: "text" },
    { name: "Email", ref: email, type: "email" },
    { name: "Password", ref: password, type: "password" },
    { name: "Confirm Password", ref: confirmPassword, type: "password" },
  ];

  useEffect(() => {
    setIncorrectField((prev) => {
      const updatedIncorrectField = [...prev];
      for (let i = 0; i < isEmpty.length; i++) {
        if (isEmpty[i] || isTooLong[i] || (i == 2 && !isValidEmail) || (i >= 3 && passwordTooShort[i-3])) {
          updatedIncorrectField[i] = "invalid";
        } else {
          updatedIncorrectField[i] = "valid";
        }
      }
      console.log("Updated incorrectField", updatedIncorrectField);
      return updatedIncorrectField;
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
                  ref: MutableRefObject<HTMLInputElement | undefined>;
                  type: string;
                },
                index: number
              ) => (
                <div className="register-data">
                  <label>{field.name}</label>
                  <input
                    ref={field.ref as LegacyRef<HTMLInputElement>}
                    type={field.type}
                    className={"register-fields-" + incorrectField[index]}
                    onBlur={() => {
                      (field.ref! as any).current &&
                        handleIncorrectField(
                          (field.ref! as any).current.value,
                          index
                        );
                    }}
                  />
                  {isEmpty[index] && (
                    <label className="invalid-field">Field is required</label>
                  )}
                  {isTooLong[index] && (
                    <label className="invalid-field">
                      Maximum is 32 characters
                    </label>
                  )}
                  {!isValidEmail && !isEmpty[index] && index == 2 && (
                    <label className="invalid-field">
                      Please enter a valid email address
                    </label>
                  )}
                  {passwordTooShort[index - 3] &&
                    index >= 3 &&
                    !isEmpty[index] && (
                      <label className="invalid-field">
                        Minimum is 5 characters
                      </label>
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
