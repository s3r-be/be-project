import React from "react";
import ReactDOM from "react-dom";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import authReducer from "../../store/reducers/auth";

import Visualisations from "../Visualisations";

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer
});

const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Provider store={store}><Visualisations /></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
});