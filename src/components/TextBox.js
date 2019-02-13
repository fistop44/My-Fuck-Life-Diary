import React, { useState, useEffect } from "react";
import { Comment, List, Button } from "antd";
import moment from "moment";
import { listPosts, deletePost } from "../firebase/App";

export default () => {
  const [data, setData] = useState([]);

  const handlePostChange = value => {
    console.log(value);
    const keys = Object.keys(value);
    const datas = [];
    keys.forEach(key => {
      const item = value[key];
      const dumb = {
        content: item.detail || "",
        datetime: item.time || "",
        author: item.author || "",
        actions: [<Button onClick={() => deletePost({ key })}>Delete</Button>]
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
  }, []);

  return (
    <div>
      <List
        className="comment-list"
        style={{ width: "100%", maxWidth: "600px", margin: "auto" }}
        header={`${data.length} stories`}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => {
          console.log(item);
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
