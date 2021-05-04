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
import { resetCodeAlreadySentError } from "../../utils/errors";

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
  const [codeHidden, setCodeHidden] = useState(true);

  // Alert shown when reset code is sent
  const showResetCodeSentAlert = () => {
    showAlert(
      "success",
      "Please input the code that has been sent to your email."
    );
  };

  const resendCodeHandler = (email) => {
    setFormIsBeingSubmitted(true);

    axios
      .post(
        "/api/user/reset_password/resend_code",
        { email },
        {
          headers: {
            authorization: process.env.REACT_APP_API_KEY,
          },
        }
      )
      .then((res) => {
        setFormIsBeingSubmitted(false);
        showResetCodeSentAlert();
      })
      .catch((err) => {
        setFormIsBeingSubmitted(false);
        if (err.response) {
          showAlert("danger", err.response.data.msg);
        } else {
          showAlert("danger", "Unexpected server error.");
        }
      });
  };

  const resetPasswordButtonHandler = (values) => {
    const { emailField } = values;
    setFormIsBeingSubmitted(true);
    axios
      .post(
        "/api/user/reset_password/",
        { email: emailField },
        {
          headers: {
            Authorization: process.env.REACT_APP_API_KEY,
          },
        }
      )
      .then((res) => {
        setFormIsBeingSubmitted(false);
        if (res.data.success) {
          setCodeHidden(false);
          showResetCodeSentAlert();
        }
      })
      .catch((err) => {
        setFormIsBeingSubmitted(false);
        if (err.response) {
          // If the reset password code is already sent to the user
          if (err.response.data.err === resetCodeAlreadySentError) {
            showAlert(
              "info",
              <span>
                Reset code has already been sent to your email, click{" "}
                <a
                  href="#resend_code"
                  className="alert-link"
                  onClick={(e) => {
                    e.preventDefault();
                    resendCodeHandler(emailField);
                  }}
                >
                  {"here"}
                </a>{" "}
                if you didn't receive it.
              </span>
            );
            setCodeHidden(false);
          } else {
            showAlert("danger", err.response.data.msg);
          }
        } else {
          showAlert("danger", "Unexpected server error.");
        }
      });
  };

  const sendCodeButtonHandler = (values) => {
    const { emailField, codeField } = values;
    setFormIsBeingSubmitted(true);
    axios
      .post(
        "/api/user/reset_password/validate_code",
        {
          email: emailField,
          code: codeField,
        },
        {
          headers: {
            authorization: process.env.REACT_APP_API_KEY,
          },
        }
      )
      .then((res) => {
        setPasswordHidden(false);
        setFormIsBeingSubmitted(false);
        showAlert("success", "Enter your new password.");
      })
      .catch((err) => {
        setFormIsBeingSubmitted(false);
        if (err.response) {
          showAlert("danger", err.response.data.msg);
        } else {
          showAlert("danger", "Unexpected server error.");
        }
      });
  };

  const changePasswordButtonHandler = (values) => {
    const { emailField, codeField, passwordField } = values;

    setFormIsBeingSubmitted(true);

    axios
      .put(
        "/api/user/reset_password/change_password",
        {
          email: emailField,
          password: passwordField,
          code: codeField,
        },
        {
          headers: {
            authorization: process.env.REACT_APP_API_KEY,
          },
        }
      )
      .then((res) => {
        setFormIsBeingSubmitted(false);
        showAlert("success", "You password has been changed.");
        setTimeout(() => {
          props.setPage("login");
        }, 1500);
      })
      .catch((err) => {
        setFormIsBeingSubmitted(false);
        if (err.response) {
          showAlert("danger", err.response.data.msg);
        } else {
          showAlert("danger", "Unexpected server error");
        }
      });
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
            disabled={!codeHidden || formIsBeingSubmitted}
          />
          {!codeHidden ? (
            <Field
              name="codeField"
              component={renderField}
              validate={[required]}
              type="text"
              label="Code"
              bsSize="sm"
              className="mt-3"
              disabled={!passwordHidden || formIsBeingSubmitted}
            />
          ) : null}
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
              disabled={formIsBeingSubmitted}
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
              passwordHidden && codeHidden
                ? handleSubmit(resetPasswordButtonHandler)
                : !codeHidden && passwordHidden
                ? handleSubmit(sendCodeButtonHandler)
                : handleSubmit(changePasswordButtonHandler)
            }
            disabled={submitting || formIsBeingSubmitted}
          >
            {passwordHidden && codeHidden
              ? "Reset Password"
              : !codeHidden && passwordHidden
              ? "Submit Code"
              : "Change Password"}
            &nbsp;
            {formIsBeingSubmitted ? (
              <Spinner size="sm" color="secondary" />
            ) : null}
          </Button>
        </div>
        <div className="d-flex flex-column mt-2">
          <small>
            Login?&nbsp;
            <a
              href="#login"
              onClick={loginLinkPressed}
              disabled={formIsBeingSubmitted}
            >
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
