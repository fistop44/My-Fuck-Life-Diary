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
    .ref("/posts")
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
    .ref("/posts")
    .push(data);
};

export const deletePost = ({ key }) => {
  firebase
    .database()
    .ref(`/posts/${key}`)
    .remove();
};

export const like = ({ key }) => {
  firebase
    .database()
    .ref(`/likes/${key}`)
    .transaction(function(like) {
      // If users/ada/rank has never been set, like will be `null`.
      if (like) {
        return like + 1;
      }
      return 1;
    });
};

export const getLikes = ({ handleLikeChange }) => {
  firebase
    .database()
    .ref(`/likes`)
    .on("value", snap => {
      handleLikeChange(snap.val());
    });
};

export default firebase;
