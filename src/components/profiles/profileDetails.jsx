import React from "react";
 
const profileDetails = ({ user }) => {
  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user.name}!</h2>
          <p>Email: {user.email}</p>
          <img src={user.avatar} alt="Avatar" />
          <img src={user.banner} alt="Banner" />
          <p>Posts: {user._count.posts}</p>
          <p>Followers: {user._count.followers}</p>
          <p>Following: {user._count.following}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
 
export default profileDetails;