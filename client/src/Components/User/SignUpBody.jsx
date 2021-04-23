import React, { useState } from "react";
import { Button, ModalBody, Input } from "reactstrap";
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

  const { handleSubmit, pristine, reset, submitting } = props;

  return (
    <ModalBody>
      <div className="d-flex justify-content-center">
        <strong className="text-primary">Sign Up</strong>
      </div>
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
          onClick={handleSubmit((values) => {
            console.log(values);
          })}
        >
          Sign Up
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
