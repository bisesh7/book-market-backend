import axios from "axios";
import {
  invalidTokenError,
  tokenExpiredError,
  tokenError,
} from "../utils/errors";

//response interceptor to refresh token on receiving token expired error
axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    const originalRequest = err.config;
    const errorCode = err.response.data.err;
    console.log(err);
    console.log(errorCode);
    if (
      (errorCode === tokenExpiredError || errorCode === invalidTokenError) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      return axios
        .post("/api/auth/refresh_token", null, {
          headers: {
            authorization: process.env.REACT_APP_API_KEY,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(err);
  }
);

const getUserData = () => {
  return axios.get("/api/user", {
    headers: {
      authorization: process.env.REACT_APP_API_KEY,
    },
  });
};

export const purchaseBooks = (json) => {
  return axios.post("/api/purchase_book/", json, {
    headers: {
      authorization: process.env.REACT_APP_API_KEY,
    },
  });
};

export const getPurchasedBooks = (id) => {
  return axios.get(`/api/purchase_book/${id}`, {
    headers: {
      authorization: process.env.REACT_APP_API_KEY,
    },
  });
};

export default getUserData;
