import React, { useState, useEffect } from "react";
import { Comment, List, Button } from "antd";
import moment from "moment";
import firebase, { listPosts, deletePost } from "../firebase/App";

export default () => {
  const [data, setData] = useState([]);
  const [isAuth, setAuth] = useState(null);

  const handlePostChange = value => {
    const keys = Object.keys(value);
    const datas = [];
    keys.forEach(key => {
      const item = value[key];
      const dumb = {
        content: item.detail || "",
        datetime: item.time || "",
        author: item.author || "",
        actions: [
          isAuth ? (
            <Button onClick={() => deletePost({ key })}>Delete</Button>
          ) : (
            <div />
          )
        ]
      };
      datas.push(dumb);
    });
    setData(datas.reverse());
  };

  const getPostsData = () => {
    listPosts({ handlePostChange });
  };

  useEffect(() => {
    getPostsData();
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

  return (
    <div>
      <List
        className="comment-list"
        style={{ width: "100%", maxWidth: "600px", margin: "auto" }}
        header={`${data.length} stories`}
        itemLayout="horizontal"
        dataSource={data}
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
