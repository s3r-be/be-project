import PropTypes from "prop-types";

import React, { Component } from "react";

// import ReadMoreReact from 'read-more-react';

import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  // Image,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from "semantic-ui-react";

import "./style.css";
import ddos from '../Images/Home/ddos.jpg';
import dtype from '../Images/Home/dtype.jpg';
import mitm from '../Images/Home/mitm.jpeg';
import scan from '../Images/Home/scan.jpg';
import wrong from '../Images/Home/wrong.jpeg';

const getWidth = () => {
  const isSSR = typeof window === "undefined";
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        />
        {children}
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node
};

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        {children}
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node
};

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};
/*minimumLength = 80
idealLength = 100
maxLength = 200
yourTextHere = 'xyz'*/
// function ReadMore() {
//   return (
//     <ReadMoreReact text={'xyz'}
//       min={80}
//       ideal={100}
//       max={200}
//       readMoreText="click here to read more" />
//   );
// }
const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: "8em 0em" }} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h3" style={{ fontSize: "2em", color: "white" }}>
              Intrusion Detection System
            </Header>
            <p style={{ fontSize: "1.33em", color: "#cecece" }}>
              An intrusion detection system is one such system that can be a building block in
              making the IOT network as secure as possible,that passively monitors the data exchange
              in the network and of the network with externals entities and looks for malicious
              activities that can be classified as an intrusion or attack.
            </p>
            <Header as="h3" style={{ fontSize: "2em", color: "white" }}>
              We care about Protection
            </Header>
            <p style={{ fontSize: "1.33em", color: "#cecece" }}>
              Includes IOT networks like CCTVs,smoke detectors,fire alarms,speaker systems,thermostats,vending machines.etc
            </p>
          </Grid.Column>
          <Grid.Column floated="right" width={6}>

            <img alt='idk'
            /*  src={quan}

              width="2000"
              height="200"*/

            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Button size="huge">Check Out The <span color="red">ATTACKS</span> detected</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment style={{ padding: "0em" }} vertical>
      <Grid celled="internally" columns="equal" stackable>
        <Grid.Row textAlign="center">
          <Grid.Column style={{ paddingBottom: "5em", paddingTop: "1em" }}>
            <p style={{ fontSize: "1.33em" }}>

              <img alt='ddos'
                src={ddos}

                width="500"
                height="200"

              />
            </p>
            <p>
              <img alt='dtype'
                src={dtype}
                width="500"
                height="200"
              />
            </p>
            <p style={{ fontSize: "1.33em" }}>
            </p>
            <p style={{ fontSize: "1.33em" }}>

              <img alt='mitm'
                src={mitm}
                width="500"
                height="200"
              />
            </p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: "5em", paddingTop: "1em" }}>

            <p style={{ fontSize: "1.33em" }}>
              <img alt='scan'
                src={scan}
                width="500"
                height="200"
              />
            </p>
            <p style={{ fontSize: "1.33em" }}>
              <img alt='wrong'
                src={wrong}
                width="500"
                height="200"
              />
            </p>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    </Segment>
    <Segment style={{ padding: "8em 0em" }} vertical>
      <Container text>
        <Header as="h3" style={{ fontSize: "2em", color: "white" }}>
          Overall working of the System
        </Header>
        <p style={{ fontSize: "1.33em", color: "#cecece" }}>
          This IDS is designed to run in the background of an IoT network, where distance data is processed and sent from the node (combination of ultrasonic sensor, Arduino, Nodemcu) to the apache server. The network traffic is monitored using Tshark and dumped into a csv file. The python script in the backend reads this csv file, preprocesses it and feeds it to the ML model. If an intrusion is detected, it is notified to the user on the front end.
          The ML model Random Forest is used as its accuracy was proven to be better than any other model that was tested. The model was trained using the data collected from the IoT network traffic.
        </p>

        <Divider
          as="h4"
          className="header"
          horizontal
          style={{ margin: "3em 0em", textTransform: "uppercase" }}
        >

        </Divider>
        <Header as="h3" style={{ fontSize: "2em", color: "white" }}>
          To know more about the Attacks
        </Header>
        <p style={{ fontSize: "1.33em", color: "#cecece" }}>

          DDOS-A distributed denial-of-service (DDoS) attack is a malicious attempt to disrupt normal traffic of a targeted server, service or network by overwhelming the target or its surrounding infrastructure with a flood of Internet traffic
          <br />
          SCAN-A port scan is an attack that sends client requests to a range of server port addresses on a host, with the goal of finding an active port and exploiting a known vulnerability of that service
          <br />
          DATA TYPE PROBING-Probing is a type of attack in which the intruder scans network devices to determine weakness in topology design or some opened ports and then use them in the future for illegal access to personal information
          <br />
          WRONG SETUP-It is a type of attack where attackers attempt to remove the connection or manipulate the connection of the IOT network
          <br />
          MITM-It is an attack where the attacker secretly relays and possibly alters the communications between two parties who believe that they are directly communicating with each other
          <br />


        </p>

      </Container>
    </Segment>
  </ResponsiveContainer>
);
export default HomepageLayout;

