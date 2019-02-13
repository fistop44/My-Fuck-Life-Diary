import React, { Component } from "react";
import TextInput from "./components/TextInput";
import TextBox from "./components/TextBox";
import { initializeApp } from "./firebase/App";
import firebase from "firebase/app";

var provider = new firebase.auth.GoogleAuthProvider();

class App extends Component {
  constructor(props) {
    super(props);
    initializeApp();
    this.state = {
      counter: 0
    };
    this.increment = this.increment.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.counter === 10) {
      this.signIn();
    }
  }

  signIn() {
    firebase.auth().signInWithRedirect(provider);
  }

  increment() {
    this.setState({ counter: this.state.counter + 1 });
  }

  render() {
    return (
      <div>
        <div
          onClick={() => this.increment()}
          style={{
            background: "none",
            border: "none",
            width: "100%",
            textAlign: "center",
            fontSize: "2em"
          }}
        >
          Fuck life story
        </div>
        <TextInput />
        <TextBox />
      </div>
    );
  }
}

export default App;
