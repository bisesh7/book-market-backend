import React, { useState } from "react";
import { Alert, Button, ModalBody, Spinner } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import { renderField } from "./renderField";
import {
  email,
  minLength8,
  oneLowercase,
  oneNumber,
  oneSpecialCharacter,
  oneUppercase,
  required,
} from "./validation";
import { connect } from "react-redux";
import { loginUser } from "../../Actions/actionUser";

import ModalCloseButton from "./ModalCloseButton";

const LoginBody = (props) => {
  const signUpLinkPressed = (e) => {
    e.preventDefault();
    props.setPage("signup");
  };

  const [passwordType, setPasswordType] = useState("password");

  const changePasswordType = (e) => {
    e.preventDefault();
    passwordType === "password"
      ? setPasswordType("text")
      : setPasswordType("password");
  };

  const [formIsBeingSubmitted, setFormIsBeingSubmitted] = useState(false);

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

  const { handleSubmit, reset, submitting } = props;

  const loginButtonHandler = (values) => {
    props.loginUser(values, setFormIsBeingSubmitted, showAlert, reset, () => {
      if (props.navLinkHidden) {
        setTimeout(() => {
          props.setModal(false);
        }, 1500);
      }
    });
  };

  const forgotPasswordHandler = (e) => {
    e.preventDefault();
    props.setPage("forgot_password");
  };

  return (
    <ModalBody>
      <div className="d-flex justify-content-center">
        <strong className="text-primary">Log In</strong>
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
          label="Password"
          bsSize="sm"
          className="mt-3"
        />
      </div>{" "}
      <div className="d-flex justify-content-center mt-3">
        <Button
          size="sm"
          color="primary"
          block
          type="button"
          onClick={handleSubmit(loginButtonHandler)}
          disabled={submitting || formIsBeingSubmitted}
        >
          Login{" "}
          {formIsBeingSubmitted ? (
            <Spinner size="sm" color="secondary" />
          ) : null}
        </Button>
      </div>
      <div className="d-flex flex-column  mt-2">
        <small>
          Forgot Password?&nbsp;
          <a href="#resetPassword" onClick={forgotPasswordHandler}>
            Reset
          </a>
          .
        </small>{" "}
        <small>
          Don't have an account?{" "}
          <a href="#signUp" onClick={signUpLinkPressed}>
            Sign Up
          </a>
          .
        </small>
      </div>
    </ModalBody>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { loginUser })(
  reduxForm({
    form: "loginForm",
  })(LoginBody)
);
