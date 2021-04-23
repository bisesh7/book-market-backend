import React, { useState } from "react";
import { Button, Modal } from "reactstrap";
import LoginBody from "./LoginBody";
import SignUpBody from "./SignUpBody";

const LoginSignupModal = (props) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const [page, setPage] = useState("login");

  return (
    <div>
      <Button color="secondary" size="sm" onClick={toggle}>
        {props.buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={props.className}>
        {page === "login" ? (
          <LoginBody setPage={setPage} />
        ) : (
          <SignUpBody setPage={setPage} />
        )}
      </Modal>
    </div>
  );
};

export default LoginSignupModal;
