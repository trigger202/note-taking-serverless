import React, { useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import { connect } from "react-redux";
import { doUserRegister } from "../actions/Auth";
import LoaderButton from "../components/LoaderButton";
import "../components/LoaderButton.css";

const Singup = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function validateForm() {
    return email.length > 0 && password.length > 5;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await props.doUserRegistration({ username: email, password: password });
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <h3>Sign up</h3>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email/Username</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={props.isLoading}
          disabled={!validateForm()}
        >
          Sing up
        </LoaderButton>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    isLoading: state.auth.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doUserRegistration: payload => dispatch(doUserRegister(payload))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Singup);
