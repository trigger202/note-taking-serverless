import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import Amplify from 'aws-amplify';
import config from './config';
// window.LOG_LEVEL = 'DEBUG'

import { createStore, applyMiddleware, compose } from "redux";
import rootReducers from './reducers'
import thunkMiddleware from 'redux-thunk'
import logger from "./middleware/logger";
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';


Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        identityPoolId: config.cognito.IDENTITY_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID,
        identityPoolRegion: config.cognito.REGION,
    },
    Storage: {
        region: config.s3.REGION,
        bucket: config.s3.BUCKET,
        identityPoolId: config.cognito.IDENTITY_POOL_ID
    },
    API: {
        endpoints: [
            {
                name: "notes",
                endpoint: config.apiGateway.URL,
                region: config.apiGateway.REGION
            },
        ]
    }
});


const middlewareEnhancer = applyMiddleware(thunk, logger, thunkMiddleware);
const composedEnhancers = compose(
    middlewareEnhancer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

// const loadState = () => {
//     try {
//         const serializedState = localStorage.getItem('state');
//         if (serializedState === null) {
//             return undefined;
//         }
//         return JSON.parse(serializedState);
//     } catch (e) {
//         return undefined;
//     }
// };

// const saveState = (state) => {
//     console.log("saving state")
//     try {
//         const serializedState = JSON.stringify(state);
//         localStorage.setItem('state', serializedState);
//     } catch (e) {
//         // Ignore write errors;
//     }
// };

// const peristedState = loadState();




const appStore = createStore(
    rootReducers,
    undefined,
    composedEnhancers
);
// appStore.subscribe(() => {
//     saveState(appStore.getState());
// });

ReactDOM.render(

    <Router>
        <Provider store={appStore} >
            <App />
        </Provider>
    </Router>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
