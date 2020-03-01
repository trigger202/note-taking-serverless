import React, { useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import { connect } from 'react-redux';
import { doUserLoginCall } from "../actions/Auth";
import LoaderButton from "../components/LoaderButton";
import "../components/LoaderButton.css";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    function validateForm() {
        return email.length > 0 && password.length > 5;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        await props.doLoginUser({ email: email, password: password });
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Email</ControlLabel>
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
                    Login
</LoaderButton>
            </form>
        </div>
    );


}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        isLoading: state.auth.isLoading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        doLoginUser: payload => dispatch(doUserLoginCall(payload)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)