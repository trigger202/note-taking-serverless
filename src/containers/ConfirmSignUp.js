import React, { useState } from "react";
import { connect } from "react-redux";
import { doConfirmSignUp } from "../actions/Auth";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";

const ConfirmSignUp = props => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("code", code);
    await props.doConfirmSignUp({ username: email, code: code });
  }
  function validateForm() {
    return email.length > 0 && code.length > 5;
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <h3>Confirm Sign Up</h3>
        <FormGroup bsSize="large">
          <ControlLabel>Email/Username</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup bsSize="large">
          <ControlLabel>Code</ControlLabel>
          <FormControl
            value={code}
            onChange={e => setCode(e.target.value)}
            type="text"
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={props.isLoading}
          disabled={!validateForm()}
        >
          Sign up
        </LoaderButton>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    isLoading: state.auth.isLoading,
    isLoggedIn: state.auth.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doConfirmSignUp: payload => dispatch(doConfirmSignUp(payload))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmSignUp);
