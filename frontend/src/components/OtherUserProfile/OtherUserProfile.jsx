import React from "react";
import styles from "./OtherUserProfile.css"

const OtherUserProfile = () => {
  const otherUser = window.localStorage.getItem("otherUserID");
  const friendsList = window.localStorage.getItem("userFriends").split(",");

  return (
    <>
      <div className="profile-container">
        <div className="profile-img-container">
        <img className="profile-img" src={window.localStorage.getItem("image")} />
        </div>
        <h1 className="profile-username">{window.localStorage.getItem("username")}</h1>
        {friendsList.includes(otherUser) ? (
          <button>You are friends</button>
        ) : (
          <button>You are not friends</button>
        )}

        {/* window.localStorage.getItem("friends").split(',').each(friend) => if userprofile ID is in friends array */}
      </div>
      {/* if other userprofile.id is in current user friends array display unfriend + link to friends
      otherwise display add friend button */}
      {/* display feed of posts where post author id matches userprofile.id */}
    </>
  );
};

export default OtherUserProfile;
