import axios from "axios";

export const signInHandler = async (credentials) => {
  try {
    const response = await axios.post(
      "https://api.famto.in/api/v1/auth/sign-in",
      credentials
    );

    return response.status === 200 ? response.data : null;
  } catch (err) {
    throw new Error(JSON.stringify(err.response.data.errors));
  }
};
