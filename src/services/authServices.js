import axios from "axios";

import { toast } from "react-toastify";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const validateEmail = email => {
  return email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/);
};

export const registerUser = async userData => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/users/register`,
      userData,
      {
        withCredentials: true,
      }
    );
    if (response.statusText === "OK") {
      toast.success("User Registered successfully! ");
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    toast.error(message);
  }
};

export const loginUser = async userData => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/users/login`,
      userData,
      {
        withCredentials: true,
      }
    );
    if (response.statusText === "OK") {
      toast.success("Login successfully! ");
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    toast.error(message);
  }
};
