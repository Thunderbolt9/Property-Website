import axios from "axios";
import { API_URL } from "../config";

const payloadHeader = {
  headers: {
    "Content-Type": "application/json",
  },
};

const authFunctions = {
  //function for user login
  async login(payload) {
    try {
      const res = await axios.post(
        `${API_URL}/user/login`,
        payload,
        { withCredentials: true },
        payloadHeader
      );
      return res.data;
    } catch (err) {
      if (err.response) {
        return err.response.data;
      }
      console.log(err);
      return err.message;
    }
  },

  //function for user registration
  async register(payload) {
    try {
      const res = await axios.post(
        `${API_URL}/user/register`,
        payload,
        { withCredentials: true },
        payloadHeader
      );
      return res.data;
    } catch (err) {
      if (err.response) {
        return err.response.data;
      }
      console.log(err);
      return err.message;
    }
  },

  // function for user profile updation
  async update(payload) {
    try {
      const res = await axios.post(
        `${API_URL}/user/updateUser`,
        payload,
        { withCredentials: true },
        payloadHeader
      );
      return res.data;
    } catch (err) {
      if (err.response) {
        return err.response.data;
      }
      console.log(err);
      return err.message;
    }
  },

  async changeRole(id) {
    try {
      const res = await axios.post(
        `${API_URL}/admin/changeRole`,
        { withCredentials: true, id: id },
        payloadHeader
      );
      return res.data;
    } catch (err) {
      if (err.response) {
        return err.response.data;
      }
      console.log(err);
      return err.message;
    }
  },
};

export default authFunctions;
