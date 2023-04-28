import React, { useState } from "react";
import styles from "./Post.css";
const moment = require("moment");

const Post = (props) => {
  const { post, token, setToken, userID} = props;
  const [deletedPost, setDeletedPost] = useState(false);
  const currentUser = window.localStorage.getItem("userID");
  const createdBy = post.author.id



  const Delete = () => {
    if (token) {
      fetch("/api/posts/", {
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { _id: post._id },
      })
        .then((response) => response.json())
        .then(async (data) => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setDeletedPost(true);
          console.log("message", "Message has been deleted");
        });
    }
  };

  const displayPost = (deletedPost) => {
    if (deletedPost === false)
      return (
        <div className="post-container">
          <h4 className="post-timestamp">
            {moment(post.createdAt).calendar()}
          </h4>
          <p data-cy="authorID">Author ID -- {createdBy}</p>
          <p className="post-message">{post.message}</p>
          <div className="border-separator"></div>
          {createdBy == currentUser ?
          <h4 className="post-delete" data-cy="delete" onClick={Delete}>
            Delete
          </h4>
          : null }
        </div>
      );
    else
      return (
        <div className="post-container">
          <p>This message has been deleted.</p>
        </div>
      );
  };
  return (

    <article className="post" data-cy="post" key={post._id}>
      {displayPost(deletedPost)}
    </article>
  );
};

export default Post;
