import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import moment from "moment";

export const initializeApp = () => {
  var config = {
    apiKey: "AIzaSyC1vinlaaHvkC47f_ProDG5v3LSX2IbihE",
    authDomain: "fuck-thitgorn.firebaseapp.com",
    databaseURL: "https://fuck-thitgorn.firebaseio.com",
    projectId: "fuck-thitgorn",
    storageBucket: "fuck-thitgorn.appspot.com",
    messagingSenderId: "852678568938"
  };
  return firebase.initializeApp(config);
};

export const listPosts = ({ handlePostChange }) => {
  firebase
    .database()
    .ref("/")
    .on("value", snap => {
      handlePostChange(snap.val());
    });
};

export const addPost = ({ detail }) => {
  const data = {
    author: "ZivesO",
    detail,
    time: moment().toISOString()
  };
  firebase
    .database()
    .ref("/")
    .push(data);
};

export const deletePost = ({ key }) => {
  firebase
    .database()
    .ref(`/${key}`)
    .remove();
};

export default firebase;
