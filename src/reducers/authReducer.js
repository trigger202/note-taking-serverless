
import Auth from "../actions/Auth";


const authInitialState = {
    user: null,
    isLoggedIn: false,
    isLoading: false,
    error: null
};

const AuthReducer = (initState = authInitialState, action) => {
    // console.log('aciton ', action);
    switch (action.type) {
        case Auth.USER_LOGIN_REQUEST:
            return {
                ...initState,
                isLoading: true
            }


        case Auth.USER_LOGIN_SUCCESS:
            return {
                ...initState,
                user: action.payload,
                isLoggedIn: true,
            }

        case Auth.USER_LOGIN_ERROR:
            return {
                ...initState,
                isLoading: false,
                error: action.payload || null,
            }
        case Auth.USER_LOGOUT_SUCCESS:
            return {
                ...initState,
                isLoggedIn: false,
                user: null,
            }
        default:
            return initState;
    }
}

export default AuthReducer;