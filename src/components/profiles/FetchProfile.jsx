import { useLocalStorage } from "../../hooks/useLocalStorage";
import { PROFILE_URL } from "../../constants/apiUrl";
 
const fetchProfile = async (user) => {
  try {
    const accessToken = useLocalStorage();
    const response = await fetch(PROFILE_URL + user, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user profile data");
    }
    const profileData = await response.json();
    console.log("Profile:", profileData);
    return profileData;
  } catch (error) {
    console.error("Error fetching user profile data:", error);
    throw error;
  }
};
 
export default fetchProfile;