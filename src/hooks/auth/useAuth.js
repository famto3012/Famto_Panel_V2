import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const signInHandler = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/sign-in`, credentials);

    return response.status === 200 ? response.data : null;
  } catch (err) {
    throw new Error(JSON.stringify(err.response.data.errors));
  }
};
