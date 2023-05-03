import React, {useState, useEffect} from "react";
import Post from "../post/Post";
import "./OtherUserProfile.css";
const OtherUserProfile = ({navigate}, props) => {


  const otherUser = window.localStorage.getItem("otherUserID");
  const userID = window.localStorage.getItem("userID");
  const friendsList = window.localStorage.getItem("userFriends").split(',');
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [otherUserID, setOtherUserID] = useState(window.localStorage.getItem("otherUserID"))
  const post = props;
  const proFeed = [];

  const checkFriends = () => {
    if (otherUser === userID){
      return null
    }
    else if (friendsList.includes(otherUser)) {
      return <button>They are friends.</button>
    }
    else {
      return <button>They are not friends.</button>
    }
  }

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
}, []);

  return (
    <>

        <div className="profile-container">
          <div className="profile-img-container">
        <img className="profile-img" src={window.localStorage.getItem("image")} />
        </div>
        <h1 className="profile-username">{window.localStorage.getItem("username")}</h1>
          {checkFriends()}
        </div>

        <div className="profile-feed-container">
          {posts.forEach(post => {
            if (post.author.id === otherUserID){
              proFeed.push(post)
            } else {
              console.log(false)
            }
          })}
        </div>

        <section className="feed">

          <div id="feed" role="feed" className="feed-posts">
            {proFeed.map((post) => (
              <Post
                post={post}
                key={post._id}
                token={token}
                setToken={setToken}
                userID = {userID}
                navigate={navigate}
              />
            ))}
          </div>
        </section>
    </>
  );
}

export default OtherUserProfile;
