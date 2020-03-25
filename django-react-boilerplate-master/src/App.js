import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import BaseRouter from "./routes";
import * as actions from "./store/actions/auth";
import "semantic-ui-css/semantic.min.css";
import CustomLayout from "./containers/Layout";
import { store } from 'react-notifications-component';

class App extends Component {

  constructor(props) {
    super(props);
    // get attack notif socket that was created in index
    this.attackNotif = props.attackNotif;
    this.state = {
      notifList: []
    }
  }

  // test function that sends message: hello
  testFn = () => {
    this.attackNotif.send(JSON.stringify({
      'message': 'hello'
    }));
  }

  componentDidMount() {
    this.props.onTryAutoSignup();

    // once web socket has opened
    this.attackNotif.onopen = (e) => {
      // send message to initiate notification data transfer
      this.attackNotif.send(JSON.stringify({
        'message': 'initiate notification transfer'
      }))
    }

    // on receiving message
    this.attackNotif.onmessage = (e) => {
      var data = JSON.parse(e.data);
      // create notification for attack detected
      store.addNotification({
        title: data.id + " Attack detected!",
        message: data.message,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
          pauseOnHover: true
        }
      });
      // appending received message to state
      this.setState(prevState => ({
        notifList: [...prevState.notifList, data]
      }))
      console.log('attack notif: ' + data.message);
      console.log('state notif list: ', this.state.notifList);
    };

    // on closing web socket
    this.attackNotif.onclose = (e) => {
      console.error('attackNotif socket closed unexpectedly');
    };
  }

  // pass attack notif socket to custom layout and pass chat socket to base router (for network log)
  render() {
    return (
      <Router>
        <button onClick={this.testFn} style={{ marginTop: '3em' }}>
          click
        </button>
        <CustomLayout>
          <BaseRouter chatSocket={this.props.chatSocket} notifList={this.state.notifList} />
        </CustomLayout>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
