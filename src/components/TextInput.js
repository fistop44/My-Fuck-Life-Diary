import React, { useState, useEffect } from "react";
import { Input, Button } from "antd";
import { addPost } from "../firebase/App";

export default () => {
  const [isAuth, setAuth] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    //   if auth
    //  setAuth(true)
  }, []);

  const handleInput = e => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    addPost({ detail: input });
    setInput("");
  };

  return (
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
  );
};
