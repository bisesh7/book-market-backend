import React from "react";
import { Field, reduxForm } from "redux-form";
import { ModalBody, Alert, Button, Spinner } from "reactstrap";
import ModalCloseButton from "./ModalCloseButton";
import { useState } from "react";
import { renderField } from "./renderField";
import {
  email,
  length10,
  minLength8,
  number,
  oneLowercase,
  oneNumber,
  oneSpecialCharacter,
  oneUppercase,
  required,
} from "./validation";
import axios from "axios";

const ForgotPasswordModal = (props) => {
  // Alert
  const [alertVisible, setAlertVisible] = useState(false);
  const onAlertDismiss = () => setAlertVisible(false);
  const [alertColor, setAlertColor] = useState("info");
  const [alertMessage, setAlertMessage] = useState("");

  const showAlert = (alertColor, alertMessage) => {
    setAlertColor(alertColor);
    setAlertMessage(alertMessage);
    setAlertVisible(true);
  };

  const loginLinkPressed = (e) => {
    e.preventDefault();
    props.setPage("login");
  };

  const { handleSubmit, reset, submitting } = props;
  const [formIsBeingSubmitted, setFormIsBeingSubmitted] = useState(false);

  const [passwordType, setPasswordType] = useState("password");

  const changePasswordType = (e) => {
    e.preventDefault();
    passwordType === "password"
      ? setPasswordType("text")
      : setPasswordType("password");
  };

  const [passwordHidden, setPasswordHidden] = useState(true);

  const resetPasswordButtonHandler = (values) => {
    const { emailField } = values;
    axios
      .get(`/api/user/${emailField}`, {
        headers: {
          Authorization: process.env.REACT_APP_API_KEY,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setPasswordHidden(false);
          showAlert("success", "Please enter you new password.");
        }
      })
      .catch((err) => {
        if (err.response) {
          showAlert("danger", err.response.data.msg);
        } else {
          showAlert("danger", "Unexpected server error.");
        }
      });
  };

  const passwordSubmitHandler = (values) => {
    console.log(values);
  };

  return (
    <div>
      <ModalBody>
        <div className="d-flex justify-content-center">
          <strong className="text-primary">Forgot Password</strong>
        </div>
        <ModalCloseButton setModal={props.setModal} setPage={props.setPage} />
        <Alert
          className="mt-3"
          color={alertColor}
          isOpen={alertVisible}
          toggle={onAlertDismiss}
          size="sm"
        >
          <small>{alertMessage}</small>
        </Alert>
        <div className="mt-3">
          <Field
            name="emailField"
            component={renderField}
            validate={[required, email]}
            type="email"
            label="Email"
            bsSize="sm"
          />
          {!passwordHidden ? (
            <Field
              name="passwordField"
              component={renderField}
              validate={[
                required,
                minLength8,
                oneNumber,
                oneSpecialCharacter,
                oneLowercase,
                oneUppercase,
              ]}
              changePasswordType={changePasswordType}
              type={passwordType}
              label="Enter New Password"
              bsSize="sm"
              className="mt-3"
            />
          ) : null}
        </div>{" "}
        <div className="d-flex justify-content-center mt-3">
          <Button
            size="sm"
            color="primary"
            block
            type="button"
            onClick={
              passwordHidden
                ? handleSubmit(resetPasswordButtonHandler)
                : handleSubmit(passwordSubmitHandler)
            }
            disabled={submitting || formIsBeingSubmitted}
          >
            {passwordHidden ? "Reset Password" : "Submit"}
            {formIsBeingSubmitted ? (
              <Spinner size="sm" color="secondary" />
            ) : null}
          </Button>
        </div>
        <div className="d-flex flex-column  mt-2">
          <small>
            Login?&nbsp;
            <a href="#login" onClick={loginLinkPressed}>
              Login
            </a>
            .
          </small>
        </div>
      </ModalBody>
    </div>
  );
};

export default reduxForm({ form: "forgotPasswordForm" })(ForgotPasswordModal);
