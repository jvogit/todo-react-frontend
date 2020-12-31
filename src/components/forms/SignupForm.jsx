import React, { useState } from "react";
import ValidatedFormInput from "components/forms/ValidatedFormInput";
import { Button } from "baseui/button";
import ErrorNotification from "components/notifications/ErrorNotification";
import { connect } from "react-redux";

const RegisterForm = () => {
  const [error, setError] = useState(undefined);
  const [username, setUsername] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [_, setCPassword] = useState(undefined);

  function onSubmit(e) {
    e.preventDefault();
  }

  return (
    <form onSubmit={onSubmit}>
      {error && <ErrorNotification errorMessage={error} />}
      <ValidatedFormInput
        label="Username"
        onChange={setUsername}
      />
      <ValidatedFormInput
        label="Email"
        onChange={setEmail}
      />
      <ValidatedFormInput
        label="Password"
        type="password"
        onChange={setPassword}
      />
      <ValidatedFormInput
        label="Confirm Password"
        type="password"
        onChange={setCPassword}
        onValidate={(value) => value === password}
        errorMessage={"Passwords do not match!"}
      />
      <Button
        type="submit"
        overrides={{
          BaseButton: {
            style: {
              width: "100%"
            }
          }
        }}
      >
        Sign up
      </Button>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterForm);