import React, { useState } from "react";
import "../styles/auth.css";

const Auth = () => {
  console.log("got here");
  const [handleUnderline, setHandleUnderline] = useState<string[]>(["",""]);
  return (
    <div className="authentication-background">
      <div className="authentication-wrapper">
        <button className="close-authentication-modal">x</button>
        <div className="authentication-options">
          <div className={"authentication-option "}>LOG IN</div>
          <div className={"authentication-option "}>CREATE ACCOUNT</div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
