import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import BaseRouter from "./routes";
import * as actions from "./store/actions/auth";
import "semantic-ui-css/semantic.min.css";
import CustomLayout from "./containers/Layout";
import { store } from 'react-notifications-component';
import Sound from 'react-sound';
import attack_sound from './sounds/attack notif 1.mp3';
import scan_sound from './sounds/attack notif 2.mp3';

class App extends Component {

  constructor(props) {
    super(props);
    // get attack notif socket that was created in index
    this.attackNotif = props.attackNotif;
    this.chatSocket = props.chatSocket;
    this.state = {
      // list of all the attack notifications
      notifList: [],
      // list of all the network logs
      netLogs: [],
      // dictionary to maintain the number of each attack
      attackStats: {
        'Wrong Setup': 0,
        'DDOS': 0,
        'Data Type Probing': 0,
        'Scan Attack': 0,
        'MITM': 0
      },
      // used to set off notification sound
      play_attack_rcvd: false,
      play_scan_rcvd: false
    }
  }

  componentDidMount() {
    this.props.onTryAutoSignup();
    // ----------------------------------------------------------------------- attack notif start

    // on receiving message
    this.attackNotif.onmessage = (e) => {

      var data = JSON.parse(e.data);

      // create notifications only when authenticated (logged in)
      if (this.props.isAuthenticated) {

        // yellow notif and different sound for scan attack - passive
        if (data['attack.type'] === 'Scan Attack') {
          this.setState({ play_scan_rcvd: true });
          // console.log('play_scan_rcvd: ' + this.state.play_scan_rcvd);
          setTimeout(function () { //Start the timer
            this.setState({ play_scan_rcvd: false }); //After 1 second, set render to true
            // console.log('play_scan_rcvd: ' + this.state.play_scan_rcvd);
          }.bind(this), 1000);

          // create notification for attack detected
          store.addNotification({
            title: " Attack detected! - " + data['attack.type'],
            message: data['frame.time'],
            type: "warning",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 7000,
              onScreen: true,
              pauseOnHover: true
            }
          });
        } else {
          // create notification for attack detected
          store.addNotification({
            title: " Attack detected! - " + data['attack.type'],
            message: data['frame.time'],
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 7000,
              onScreen: true,
              pauseOnHover: true
            }
          });

          // to activate notif sound
          this.setState({ play_attack_rcvd: true });
          // reset notif_rcvd
          // console.log('play_attack_rcvd: ' + this.state.play_attack_rcvd);
          setTimeout(function () { //Start the timer
            this.setState({ play_attack_rcvd: false }); //After 1 second, set render to true
            // console.log('play_attack_rcvd: ' + this.state.play_attack_rcvd);
          }.bind(this), 1000);
        }
      }

      // appending received message to state
      this.setState(prevState => ({
        notifList: [...prevState.notifList, data],
        // set the stats of current attack type to one more than previous (increment count)
        attackStats: { ...prevState.attackStats, [data['attack.type']]: prevState.attackStats[data['attack.type']] + 1 }
      }))
      // console.log('attack notif: ' + data.message);
      // console.log('state notif list: ', this.state.notifList);
    };

    // on closing web socket
    this.attackNotif.onclose = (e) => {
      console.error('attackNotif socket closed unexpectedly');
    };

    // ----------------------------------------------------------------------- attack notif end

    // ----------------------------------------------------------------------- chat socket start

    // on receiving message
    this.chatSocket.onmessage = (e) => {
      var data = JSON.parse(e.data);
      // appending received message to state
      this.setState(prevState => ({
        netLogs: [...prevState.netLogs, data]
      }))
      // console.log(data);
      // console.log('state netLogs: ', this.state.netLogs);
    };

    // on closing web socket
    this.chatSocket.onclose = (e) => {
      console.error('Chat socket closed unexpectedly');
    };

    // ----------------------------------------------------------------------- chat socket end
  }

  // pass attack notif socket to custom layout and pass chat socket to base router (for network log)
  render() {
    return (
      <React.Fragment>
        {this.state.play_attack_rcvd ?
          (<Sound
            url={attack_sound}
            playStatus={Sound.status.PLAYING}
            onLoading={this.handleSongLoading}
            onPlaying={this.handleSongPlaying}
            onFinishedPlaying={this.handleSongFinishedPlaying}
          />) : (<div></div>)
        }
        {this.state.play_scan_rcvd ?
          (<Sound
            url={scan_sound}
            playStatus={Sound.status.PLAYING}
            onLoading={this.handleSongLoading}
            onPlaying={this.handleSongPlaying}
            onFinishedPlaying={this.handleSongFinishedPlaying}
          />) : (<div></div>)
        }
        <Router>
          <CustomLayout>
            <BaseRouter netLogs={this.state.netLogs} notifList={this.state.notifList} attackStats={this.state.attackStats} phpSocket={this.props.phpSocket} />
          </CustomLayout>
        </Router>
      </React.Fragment>
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
