import React, { useState, useEffect } from "react";
import { Input, Button } from "antd";
import firebase, { addPost } from "../firebase/App";

export default () => {
  const [isAuth, setAuth] = useState(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        setAuth(user.displayName);
      } else {
        // No user is signed in.
        setAuth(null);
      }
    });
  }, []);

  const handleInput = e => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    addPost({ detail: input });
    setInput("");
  };

  return isAuth ? (
    <div
      style={{
        display: "flex",
        margin: "auto",
        width: "100%",
        maxWidth: "500px"
      }}
    >
      <Input placeholder="Fuck my life" value={input} onChange={handleInput} />
      <Button onClick={handleSubmit}>SEND</Button>
    </div>
  ) : null;
};
