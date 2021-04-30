import React, { useState } from "react";
import { Alert, Button, ModalBody, Spinner } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import { renderField } from "./renderField";
import {
  email,
  minLength8,
  number,
  oneLowercase,
  oneNumber,
  oneSpecialCharacter,
  required,
  oneUppercase,
  length10,
} from "./validation";
import axios from "axios";
import { userExistsError, serverError } from "../../utils/errors";
import ModalCloseButton from "./ModalCloseButton";

const SignUpBody = (props) => {
  const loginLinkPressed = (e) => {
    e.preventDefault();
    props.setPage("login");
  };

  const [passwordType, setPasswordType] = useState("password");

  const changePasswordType = (e) => {
    e.preventDefault();
    passwordType === "password"
      ? setPasswordType("text")
      : setPasswordType("password");
  };

  const { handleSubmit, submitting, reset } = props;

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

  const signUpButtonHandler = (values) => {
    const { emailField, passwordField, phoneNumberField } = values;
    setFormIsBeingSubmitted(true);
    axios
      .post(
        "/api/user",
        {
          email: emailField,
          password: passwordField,
          phoneNumber: phoneNumberField,
        },
        {
          headers: {
            authorization: process.env.REACT_APP_API_KEY,
          },
        }
      )
      .then((res) => {
        setFormIsBeingSubmitted(false);
        showAlert("info", res.data.msg);
        // Change the modal to login after 1.5 secs
        setTimeout(() => {
          props.setPage("login");
        }, 1500);
      })
      .catch((err) => {
        setFormIsBeingSubmitted(false);
        showAlert("warning", err.response.data.msg);

        switch (err.response.data.err) {
          case userExistsError:
          case serverError:
            // Reset the form fields
            reset();
            break;
          default:
            // If form fields has errors then we should not reset UX
            break;
        }
      });
  };

  return (
    <ModalBody>
      <div className="d-flex justify-content-center">
        <strong className="text-primary">Sign Up</strong>
      </div>
      <ModalCloseButton setModal={props.setModal} />
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
          type="email"
          validate={[required, email]}
          label="Email"
          bsSize="sm"
        />
        <Field
          name="phoneNumberField"
          component={renderField}
          type="number"
          validate={[required, length10, number]}
          label="Phone Number"
          bsSize="sm"
          className="mt-3"
        />
        <Field
          name="passwordField"
          component={renderField}
          type={passwordType}
          validate={[
            required,
            minLength8,
            oneNumber,
            oneSpecialCharacter,
            oneLowercase,
            oneUppercase,
          ]}
          changePasswordType={changePasswordType}
          label="Password"
          bsSize="sm"
          className="mt-3"
        />{" "}
        <br />
      </div>
      <div className="d-flex justify-content-center mt-3">
        <Button
          size="sm"
          color="primary"
          block
          onClick={handleSubmit(signUpButtonHandler)}
          disabled={submitting || formIsBeingSubmitted}
        >
          Sign Up{" "}
          {formIsBeingSubmitted ? (
            <Spinner size="sm" color="secondary" />
          ) : null}
        </Button>
      </div>
      <div className="mt-2">
        <small>
          Already have an account?{" "}
          <a href="#login" onClick={loginLinkPressed}>
            Login.
          </a>
        </small>
      </div>
    </ModalBody>
  );
};

export default reduxForm({
  form: "signUpForm",
})(SignUpBody);
