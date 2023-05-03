import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./Post.css";
const moment = require("moment");

const Post = (props) => {
  const { post, token, setToken } = props;
  const [deletedPost, setDeletedPost] = useState(false);
  const currentUser = window.localStorage.getItem("userID");
  const createdBy = post.author.id;
  const [postUsername, setPostUsername] = useState("");
  const [postImgURL, setPostImgURL] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/users/${createdBy}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPostUsername(data.user.name);
        setPostImgURL(data.user.imageURL);
      });
  }, []);

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

  const fetchUserProfile = async () => {
    fetch(`/api/users/${createdBy}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(async (data) => {
        window.localStorage.setItem("username", data.user.name);
        window.localStorage.setItem("image", data.user.imageURL);
        window.localStorage.setItem("otherUserID", createdBy);
      })
      .then(() => {
        navigate("/profile");
      });
  };

  const displayPost = (deletedPost) => {
    if (deletedPost === false)
      return (
        <div className="post-container">
          <div className="post-user-info-container">
            <div className="post-user-img-container">
            <img src={postImgURL} alt="" className="post-user-img" onClick={fetchUserProfile}/>
            </div>
            <div className="post-user-text-container">
              <p
                onClick={fetchUserProfile}
                data-cy="authorID"
                className="post-user-username">
                {postUsername}
              </p>
              <h4 className="post-timestamp">
                {moment(post.createdAt).calendar()}
              </h4>
            </div>
          </div>
          <p className="post-message">{post.message}</p>
          <div className="border-separator"></div>
          {createdBy == currentUser ? (
            <h4 className="post-delete" data-cy="delete" onClick={Delete}>
              Delete
            </h4>
          ) : null}
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
