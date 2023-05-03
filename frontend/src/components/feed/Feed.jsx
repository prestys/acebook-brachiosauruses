import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import RouteButton from "../routeButton/RouteButton";
import styles from "./Feed.css"

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [userID, setUserID] = useState(window.localStorage.getItem("userID"))
  const username = window.localStorage.getItem("currentUsername");

  useEffect(() => {
    if (token) {
      fetch("/api/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setPosts(data.posts);
        });
    }
    console.log(username);
  }, []);

  if (token) {
    return (
      <section className="feed">
        <h2 className="feed-header">Hi {username}, What's on your mind?</h2>
        <RouteButton
          navigate={navigate}
          routePath={"/posts/new"}
          text={"Post Something"}
        />

        <div id="feed" role="feed" className="feed-posts">
          {posts.map((post) => (
            <Post
              post={post}
              key={post._id}
              token={token}
              setToken={setToken}
              // userID = {userID}
              navigate={navigate}
            />
          ))}
        </div>
      </section>
    );
  } else {
    navigate("/login");
  }
};

export default Feed;
