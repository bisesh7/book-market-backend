import { Input } from "reactstrap";

export const renderField = ({
  input,
  label,
  type,
  bsSize,
  className,
  changePasswordType,
  meta: { touched, error, warning },
}) => (
  <div>
    <div>
      <Input
        {...input}
        placeholder={label}
        bsSize={bsSize}
        type={type}
        className={className}
      />
      {label === "Password" ? (
        <small>
          <a
            href="#showPassword"
            onClick={changePasswordType}
            className="float-right show-password mt-1"
          >
            {type === "text" ? "Hide Password" : "Show Password"}
          </a>
        </small>
      ) : null}

      {touched &&
        ((error && <small className="error-text">{error}</small>) ||
          (warning && <small className="error-text">{warning}</small>))}
    </div>
  </div>
);
