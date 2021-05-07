import { credentialError, serverError } from "../utils/errors";
import { LOGIN_USER, LOGOUT_USER } from "./ActionTypes";
import axios from "axios";
import getUserData from "../config/authAPI";

export const loginUser = (
  values,
  setFormIsBeingSubmitted,
  showAlert,
  resetFields,
  cb
) => {
  const { emailField, passwordField } = values;
  setFormIsBeingSubmitted(true);
  return (dispatch) => {
    axios
      .post(
        "/api/auth",
        { email: emailField, password: passwordField },
        {
          headers: {
            authorization: process.env.REACT_APP_API_KEY,
          },
        }
      )
      .then((res) => {
        dispatch({
          type: LOGIN_USER,
          user: res.data.user,
        });
        setFormIsBeingSubmitted(false);
        showAlert("info", res.data.msg);
        cb();
      })
      .catch((err) => {
        console.log(err.response.data);
        setFormIsBeingSubmitted(false);
        showAlert("warning", err.response.data.msg);
        switch (err.response.data.err) {
          case credentialError:
          case serverError:
            // Reset the form fields
            resetFields();
            break;
          default:
            // If form fields has errors then we should not reset UX
            break;
        }
      });
  };
};

export const logoutUser = (addToast, updateToast, setLoggingOut, cb) => {
  let loggingOutToastID = null;
  addToast("Logging out", { appearance: "info", autoDismiss: false }, (id) => {
    loggingOutToastID = id;
  });
  setLoggingOut(true);
  return (dispatch) => {
    axios
      .delete("/api/auth", {
        headers: {
          authorization: process.env.REACT_APP_API_KEY,
        },
      })
      .then((res) => {
        if (res.data.success) {
          dispatch({
            type: LOGOUT_USER,
          });
          updateToast(loggingOutToastID, {
            content: "Logged out.",
            appearance: "success",
            autoDismiss: true,
          });
          setLoggingOut(false);
          cb();
        }
      })
      .catch((err) => {
        if (err.response) {
          updateToast(loggingOutToastID, {
            content: err.response.data.msg,
            appearance: "error",
            autoDismiss: true,
          });
        } else {
          updateToast(loggingOutToastID, {
            content: "Server error while logging out.",
            appearance: "error",
            autoDismiss: true,
          });
          console.log(err);
        }
        setLoggingOut(false);
      });
  };
};

export const checkUser = (addToast, removeToast) => {
  // id of the toast to be generated
  let checkingSessionToastId = null;
  addToast(
    "Checking Session.",
    { appearance: "info", autoDismiss: false },
    (id) => {
      checkingSessionToastId = id;
    }
  );
  return (dispatch) => {
    getUserData(addToast)
      .then((res) => {
        dispatch({
          type: LOGIN_USER,
          user: res.data.user,
        });
        removeToast(checkingSessionToastId);
        addToast("Session resumed.", {
          appearance: "success",
          autoDismiss: true,
        });
      })
      .catch((err) => {
        removeToast(checkingSessionToastId);
        // addToast("Session unavailable.", {
        //   appearance: "warning",
        //   autoDismiss: true,
        // });
        if (err.response) {
          console.log(err.response.data.msg);
        }
        console.log(err);
      });
  };
};
