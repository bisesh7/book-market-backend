import React, { useState } from "react";
import {
  Button,
  ModalBody,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

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

  const { handleSubmit, pristine, reset, submitting } = props;

  return (
    <ModalBody>
      <div className="d-flex justify-content-center">
        <strong className="text-primary">Log In</strong>
      </div>
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
      <br />
      <div className="d-flex justify-content-center mt-3">
        <Button
          size="sm"
          color="primary"
          block
          onClick={handleSubmit((values) => {
            console.log(values);
          })}
        >
          Login
        </Button>
      </div>
      <div className="d-flex justify-content-center mt-2">
        <small>
          Don't have an account?{" "}
          <a href="#signUp" onClick={signUpLinkPressed}>
            Sign Up.
          </a>
        </small>
      </div>
    </ModalBody>
  );
};

export default reduxForm({
  form: "loginForm",
})(LoginBody);
