import React, { Component } from "react";
import TextInput from "./components/TextInput";
import TextBox from "./components/TextBox";
import { initializeApp } from "./firebase/App";

class App extends Component {
  constructor(props) {
    super(props);
    initializeApp();
  }

  render() {
    return (
      <div>
        <TextInput />
        <TextBox />
      </div>
    );
  }
}

export default App;
