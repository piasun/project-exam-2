import React, { useEffect, useState } from "react";
import fetchProfile from "../components/profiles/FetchProfile";
import UserProfile from "../components/profiles/UserProfile";
import { useAuthContext } from "../context/authContext";

const Profile = () => {
  const { user } = useAuthContext(); 
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }
    
    // Assuming user.name or a similar identifier is available to fetch profile
    const fetchData = async () => {
      try {
        const profileData = await fetchProfile(user.name);  // This assumes user.name is an identifier for fetching the profile
        setProfile(profileData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
 
    fetchData();
  }, [user]);  // Dependency on user ensures fetchProfile runs only if user exists

  return (
    <div>
      <h1>User Profile</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <UserProfile user={profile} />  // Pass the fetched profile to UserProfile component
      )}
    </div>
  );
};

export default Profile;
