import React, { useState } from "react";
import { Button, Modal, NavLink } from "reactstrap";
import LoginBody from "./LoginBody";
import SignUpBody from "./SignUpBody";

const LoginSignupModal = (props) => {
  const [modal, setModal] = useState(false);

  const toggle = (e) => {
    e.preventDefault();
    setModal(!modal);
  };

  const [page, setPage] = useState("login");

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
        ) : (
          <SignUpBody setModal={setModal} setPage={setPage} />
        )}
      </Modal>
    </div>
  );
};

export default LoginSignupModal;
