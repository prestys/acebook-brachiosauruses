import React from "react";

const OtherUserProfile = () => {


  const otherUser = window.localStorage.getItem("otherUserID");
  const friendsList = window.localStorage.getItem("userFriends").split(',');


  return (
    <>

        <div className="profile-container">
          <img src={window.localStorage.getItem("image")}/>
          <h1>{window.localStorage.getItem("username")}</h1>
          {friendsList.includes(otherUser) ? 
            <button>They are friends</button>
           : <button>They are not friends</button>
          }

          {/* window.localStorage.getItem("friends").split(',').each(friend) => if userprofile ID is in friends array */}
        </div>
      {/* if other userprofile.id is in current user friends array display unfriend + link to friends
      otherwise display add friend button */}
      {/* display feed of posts where post author id matches userprofile.id */}
    </>
  );
};

export default OtherUserProfile;
