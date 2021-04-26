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

  const { handleSubmit, submitting, pristine, reset } = props;

  const [formIsBeingSubmitted, setFormIsBeingSubmitted] = useState(false);

  // Alert
  const [alertVisible, setAlertVisible] = useState(false);
  const onAlertDismiss = () => setAlertVisible(false);
  const [alertColor, setAlertColor] = useState("info");
  const [alertMessage, setAlertMessage] = useState("");

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
        setAlertColor("info");
        setAlertMessage(res.data.msg);
        setAlertVisible(true);
        reset();
      })
      .catch((err) => {
        setFormIsBeingSubmitted(false);
        setAlertColor("warning");
        setAlertMessage(err.response.data.msg);
        setAlertVisible(true);
        switch (err.response.data.err) {
          case "userExistsError":
            reset();
            break;
          default:
            console.log(err.response.data.err);
            break;
        }
      });
  };

  return (
    <ModalBody>
      <div className="d-flex justify-content-center">
        <strong className="text-primary">Sign Up</strong>
      </div>
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
      <div className="d-flex justify-content-center mt-2">
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
