import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

import authReducer from "./store/reducers/auth";

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer
});

const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

// create socket for network logs
const roomName = 'lobby';
const chatSocket = new WebSocket(
  'ws://' + window.location.host +
  '/ws/chat/' + roomName + '/');

// create socket for notification
const attackNotif = new WebSocket(
  'ws://' + window.location.host +
  '/ws/attackNotif/');

// pass sockets as props - so only one instance created here is maintained
const app = (
  <Provider store={store}>
    <ReactNotification />
    <App chatSocket={chatSocket} attackNotif={attackNotif} />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
