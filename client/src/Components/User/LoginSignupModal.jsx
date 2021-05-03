import React, { useState } from "react";
import { Button, Modal, NavLink } from "reactstrap";
import ForgotPasswordModal from "./ForgotPasswordBody";
import LoginBody from "./LoginBody";
import SignUpBody from "./SignUpBody";

const LoginSignupModal = (props) => {
  const [modal, setModal] = useState(false);
  const [page, setPage] = useState("login");

  const toggle = (e) => {
    e.preventDefault();
    if (modal) {
      setPage("login");
    }
    setModal(!modal);
  };

  return (
    <div>
      <NavLink href="login" onClick={toggle} hidden={props.navLinkHidden}>
        Login
      </NavLink>
      <Button
        hidden={props.buttonHidden}
        color="primary"
        size="sm"
        onClick={toggle}
        block
      >
        {props.buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={props.className}>
        {page === "login" ? (
          <LoginBody
            setModal={setModal}
            navLinkHidden={props.navLinkHidden}
            setPage={setPage}
          />
        ) : page === "signup" ? (
          <SignUpBody setModal={setModal} setPage={setPage} />
        ) : (
          <ForgotPasswordModal setModal={setModal} setPage={setPage} />
        )}
      </Modal>
    </div>
  );
};

export default LoginSignupModal;
