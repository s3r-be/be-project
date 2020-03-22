import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import BaseRouter from "./routes";
import * as actions from "./store/actions/auth";
import "semantic-ui-css/semantic.min.css";
import CustomLayout from "./containers/Layout";

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  // pass attack notif socket to custom layout and pass chat socket to base router (for network log)
  render() {
    return (
      <Router>
        <CustomLayout {...this.props} attackNotif={this.props.attackNotif}>
          <BaseRouter chatSocket={this.props.chatSocket} />
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
