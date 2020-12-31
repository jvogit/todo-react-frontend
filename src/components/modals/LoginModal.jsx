import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE
} from "baseui/modal";
import { Button, KIND as ButtonKind } from "baseui/button";
import LoginForm from "components/forms/LoginForm";
import { useHistory } from "react-router-dom";

export default ({ isOpen, setIsOpen }) => {
  const history = useHistory();

  return (
    <Modal
      onClose={() => setIsOpen(false)}
      closeable
      isOpen={isOpen}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
    >
      <ModalHeader>Login</ModalHeader>
      <ModalBody>
        <LoginForm />
      </ModalBody>
      <ModalFooter>
        <Button
          $style={{
            width: "100%",
          }}
          onClick={() => {
            setIsOpen(false);
            history.push("/signup");
          }}
        >
          Sign up
        </Button>
      </ModalFooter>
    </Modal>
  );
}