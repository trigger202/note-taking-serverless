import { Auth as awsAuth } from "aws-amplify";
import history from "../utils/history";

const Auth = {
  //LOGIN
  USER_LOGIN_REQUEST: "USER_LOGIN_REQUEST",
  USER_LOGIN: "USER_LOGIN",
  USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
  USER_LOGIN_ERROR: "USER_LOGIN_ERROR",

  //LOGUOT
  USER_LOGOUT_REQUEST: "USER_LOGOUT_REQUEST",
  USER_LOGOUT_SUCCESS: "USER_LOGOUT_SUCCESS",
  USER_LOGOUT_ERROR: "USER_LOGOUT_ERROR",

  // register
  USER_REGISTER_REQUEST: "USER_REGISTER_REQUEST",
  USER_REGISTER_SUCCESS: "USER_REGISTER_SUCCESS",
  USER_REGISTER_ERROR: "USER_LOGIN_ERROR",

  USER_CONFIRM_SIGNUP_REQUEST: "USER_CONFIRM_SIGNUP_REQUEST",
  USER_CONFIRM_SIGNUP_SUCCESS: "USER_CONFIRM_SIGNUP_SUCCESS",
  USER_CONFIRM_SIGNUP_ERROR: "USER_CONFIRM_SIGNUP_REQUEST"
};

export default Auth;

export const userLoginRequest = () => {
  return {
    type: Auth.USER_LOGIN_REQUEST
  };
};
export const userLoginSuccess = payload => {
  return {
    type: Auth.USER_LOGIN_SUCCESS,
    payload: payload
  };
};

export const userLoginError = payload => {
  return {
    type: Auth.USER_LOGIN_ERROR,
    payload: payload
  };
};

export const UserLogOutRequest = payload => {
  return {
    type: Auth.USER_LOGOUT_SUCCESS
  };
};
export const userLogOutSuccess = () => {
  return {
    type: Auth.USER_LOGOUT_SUCCESS
  };
};

export const userLogOutError = payload => {
  return {
    type: Auth.USER_LOGIN_ERROR
  };
};

export const currentUserSession = () => {
  return dispatch => {
    dispatch(userLoginRequest());
    try {
      awsAuth
        .currentSession()
        .then(res => {
          return dispatch(userLoginSuccess(res));
        })

        .catch(err => {
          return dispatch(userLoginError(err));
        });
    } catch (err) {
      if (err !== "No current user") {
        alert(err);
      }
      return dispatch(userLoginError(err));
    }
  };
};

export const doUserLogOut = () => {
  localStorage.clear();
  return dispatch => {
    dispatch(UserLogOutRequest());
    awsAuth
      .signOut()
      .then(res => {
        dispatch(userLogOutSuccess());
        history.push("/login");
      })
      .catch(err => dispatch(userLogOutError(err)));
  };
};

export const doUserLoginCall = payload => {
  const { email, password } = payload;
  return dispatch => {
    dispatch(userLoginRequest());

    awsAuth
      .signIn(email, password)
      .then(res => {
        dispatch(userLoginSuccess(res.signInUserSession));
        history.push("/");
      })
      .catch(err => dispatch(userLoginError(err.message)));
  };
};

/// USER REGISTER

export const userRegisterRequest = () => {
  return {
    type: Auth.USER_REGISTER_REQUEST
  };
};
export const userRegisterSuccess = payload => {
  return {
    type: Auth.USER_REGISTER_SUCCESS,
    payload: payload
  };
};

export const userRegisterError = payload => {
  return {
    type: Auth.USER_REGISTER_ERROR,
    payload: payload
  };
};

export const doUserRegister = payload => {
  return dispatch => {
    dispatch(userRegisterRequest);

    awsAuth
      .signUp(payload)
      .then(res => {
        console.log("register", res);
        dispatch(userRegisterSuccess(res));
      })
      .catch(err => {
        console.log("register error", err);
        dispatch(userRegisterError(err));
      });
  };
};

export const userConfirmSingUpRequest = () => {
  return {
    type: Auth.USER_CONFIRM_SIGNUP_REQUEST
  };
};
export const userConfirmSingUpSuccess = payload => {
  return {
    type: Auth.USER_CONFIRM_SIGNUP_SUCCESS,
    payload: payload
  };
};

export const userConfirmSingUpError = payload => {
  return {
    type: Auth.USER_CONFIRM_SIGNUP_ERROR,
    payload: payload
  };
};

export const doConfirmSignUp = payload => {
  console.log("payload", payload);
  const { email, code } = payload;
  const username = email;
  return dispatch => {
    dispatch(userConfirmSingUpRequest);

    awsAuth
      .confirmSignUp(username, code)
      .then(res => {
        console.log("", res);
        dispatch(userConfirmSingUpSuccess(res));
      })
      .catch(err => {
        console.log("confirm sign up error", err);
        dispatch(userConfirmSingUpError(err));
      });
  };
};
