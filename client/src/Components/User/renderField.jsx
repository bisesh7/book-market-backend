import React from "react";
import { Fragment } from "react";
import { Input } from "reactstrap";

export const renderField = ({
  input,
  label,
  type,
  bsSize,
  className,
  changePasswordType,
  disabled,
  meta: { touched, error, warning },
}) => {
  const passwordInput = label === "Password" || label === "Enter New Password";

  return (
    <div>
      <div>
        <Input
          {...input}
          placeholder={label}
          bsSize={bsSize}
          type={type}
          className={className}
          disabled={disabled}
        />
        {passwordInput ? (
          <Fragment>
            <small>
              <a
                href="#showPassword"
                onClick={changePasswordType}
                className="float-right show-password mt-1"
              >
                {type === "text" ? "Hide Password" : "Show Password"}
              </a>
            </small>
          </Fragment>
        ) : null}

        {touched &&
          ((error && <small className="error-text">{error}</small>) ||
            (warning && <small className="error-text">{warning}</small>))}
      </div>{" "}
      {passwordInput ? <br /> : null}
    </div>
  );
};
