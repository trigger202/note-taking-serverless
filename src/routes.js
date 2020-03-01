import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from './containers/Login'
import Singup from "./containers/Singup";
import NewNote from "./containers/NewNote";

export default function Routes({ appProps }) {
    return (
        <div>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={Login} />
                <Route path="/signup" exact component={Singup} />
                <Route path="/signup" exact component={Singup} />
                <Route path="/notes/new" exact component={NewNote} />
                <Route component={NotFound} />
            </Switch>
        </div>
    );
} 