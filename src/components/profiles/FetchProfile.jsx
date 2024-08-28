import axios from "axios";
import { getToken } from "../../hooks/useLocalStorage";
import { SINGLE_PROFILE_URL } from "../../constants/apiUrl";
 
const fetchProfile = async (name) => {
  try {
    const token = getToken();
    console.log("Token used in fetchProfile:", token);
    const response = await axios.get(SINGLE_PROFILE_URL(name), {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile data:", error);
    throw new Error(`Failed to fetch user profile data: ${error}`);
  }
};

export default fetchProfile;