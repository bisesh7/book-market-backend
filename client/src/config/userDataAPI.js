import axios from "axios";

const tokenExpiredError = "tokenExpiredError";
const invalidTokenError = "invalidTokenError";

//response interceptor to refresh token on receiving token expired error
axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    const originalRequest = err.config;
    const errorCode = err.response.data.err;
    if (
      (errorCode === tokenExpiredError || errorCode === invalidTokenError) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      return axios.post("/api/auth/refresh_token").then((res) => {
        if (res.status === 200) {
          console.log("Access token refreshed!");
          return axios(originalRequest);
        }
      });
    }
    return Promise.reject(err);
  }
);
