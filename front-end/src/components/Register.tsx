import "../styles/register.css";
import { useRef } from "react";
import React from 'react';

const Register = () => {
  const username = useRef<string>();
  const password = useRef<string>();

  async function HandleSubmit(event) {
    // token: JWT(username) -> hash -> hashed_username
    event.preventDefault();
    let response = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //@ts-ignore
        user: username.current.value,
        //@ts-ignore
        pass: password.current.value,
        role: "user",
      }),
    });
    response = await response.json(); // checknah JWT Testing kudeto imam wokring jwt code
    //@ts-ignore
    localStorage.setItem("auth_token", response.token);
    return false;
  }

  return (
    <div>
      <form
        onSubmit={(event) => {
          HandleSubmit(event);
          return event.preventDefault();
        }}
      >
        <div className="card glass">
          <div className="card-body">
            <h2 className="card-title">Register Here!</h2>
            <input
              //@ts-ignore
              ref={username}
              type="text"
              placeholder="username"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              //@ts-ignore
              ref={password}
              type="password"
              placeholder="password"
              className="input input-bordered w-full max-w-xs"
            />
            <div className="card-actions justify-end">
              <input
                type="submit"
                className="btn btn-primary"
                value="Submit"
              ></input>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
