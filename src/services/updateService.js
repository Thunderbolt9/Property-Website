import axios from "axios";
import { API_URL } from "../config";

const payloadHeader = {
  headers: {
    "Content-Type": "application/json",
  },
};

const updateFunction = {
    async update(payload) {
        try {
          const res = await axios.post(
            `${API_URL}/api/v1/user/profile`,
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
      }
}

export default updateFunction;
