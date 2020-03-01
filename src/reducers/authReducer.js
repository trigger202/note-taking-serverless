
import Auth from "../actions/Auth";


const authInitialState = {
    user: null,
    isLoggedIn: false,
    isLoading: false,
    error: null
};

const AuthReducer = (initState = authInitialState, action) => {
    switch (action.type) {
        case Auth.USER_LOGIN_REQUEST:
            return {
                ...initState,
                isLoading: true,
            }

        case Auth.USER_LOGIN_CURRENT_USER_REQUEST:
            return {
                ...initState,
                isLoading: true,
            }


        case Auth.USER_LOGIN_SUCCESS:
            return {
                ...initState,
                user: action.payload,
                isLoggedIn: true,
                isLoading: false,
            }

        case Auth.USER_LOGIN_ERROR:
            return {
                ...initState,
                isLoading: false,
                error: action.payload || null,
                isLoggedIn: false
            }
        case Auth.USER_LOGOUT_SUCCESS:
            return {
                ...initState,
                isLoggedIn: false,
                user: null,
                isLoading: false,
            }
        default:
            return initState;
    }
}

export default AuthReducer;