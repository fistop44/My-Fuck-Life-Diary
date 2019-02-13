import React, { useState, useEffect } from "react";
import { Comment, List, Button } from "antd";
import moment from "moment";
import heart from "./heart.svg";
import crying from "./crying.svg";
import firebase, {
  listPosts,
  deletePost,
  like,
  getLikes,
  cry,
  getCries
} from "../firebase/App";

export default () => {
  const [isAuth, setAuth] = useState(null);
  const [likes, setLikes] = useState({});
  const [posts, setPosts] = useState({});
  const [cries, setCries] = useState({});

  const handlePostChange = value => {
    if (!value) return;
    setPosts(value);
  };

  const handleLikeChange = value => {
    if (!value) return;
    setLikes(value);
  };

  const handleCryChange = value => {
    if (!value) return;
    setCries(value);
  };

  const getLikesData = () => {
    getLikes({ handleLikeChange });
  };

  const getPostsData = () => {
    listPosts({ handlePostChange });
  };

  const getCriesData = () => {
    getCries({ handleCryChange });
  };

  useEffect(() => {
    getLikesData();
    getPostsData();
    getCriesData();
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        setAuth(user.displayName);
      } else {
        // No user is signed in.
        setAuth(null);
      }
    });
  }, [isAuth]);

  const getData = () => {
    console.log(cries);
    const keys = Object.keys(posts);

    const datas = [];
    keys.forEach(key => {
      const item = posts[key];
      const dumb = {
        content: item.detail || "",
        datetime: item.time || "",
        author: item.author || "",
        actions: [
          isAuth ? (
            <Button onClick={() => deletePost({ key })}>Delete</Button>
          ) : (
            <div />
          ),
          <img
            src={heart}
            alt="heart"
            onClick={() => like({ key })}
            style={{
              width: "25px",
              height: "auto",
              margin: "10px",
              cursor: "pointer"
            }}
          />,
          <div>{likes[key]}</div>,
          <img
            src={crying}
            alt="crying"
            onClick={() => cry({ key })}
            style={{
              width: "25px",
              height: "auto",
              margin: "10px",
              cursor: "pointer"
            }}
          />,
          <div>{cries[key]}</div>
        ]
      };
      datas.push(dumb);
    });

    return datas.reverse();
  };

  return (
    <div>
      <List
        className="comment-list"
        style={{ width: "100%", maxWidth: "600px", margin: "auto" }}
        header={`${Object.keys(posts).length} stories`}
        itemLayout="horizontal"
        dataSource={getData()}
        renderItem={item => {
          return (
            <Comment
              actions={item.actions}
              author={item.author}
              avatar={item.avatar}
              content={item.content}
              datetime={moment(item.datetime).format("YYYY-MM-DD HH:mm:ss")}
            />
          );
        }}
      />
    </div>
  );
};
