import { credentialError, serverError } from "../utils/errors";
import { LOGIN_USER } from "./ActionTypes";
import axios from "axios";

export const loginUser = (
  values,
  setFormIsBeingSubmitted,
  showAlert,
  resetFields
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
