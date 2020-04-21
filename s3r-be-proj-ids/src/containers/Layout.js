import React from "react";
import {
  Container,
  Divider,
  Grid,
  Header,
  // Image,
  List,
  Menu,
  Segment,
  Icon
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";

class CustomLayout extends React.Component {

  render() {
    const { authenticated } = this.props;
    return (
      <div>
        <Menu fixed="top" inverted>
          <Container>
            <Link to="/">
              <Menu.Item header><Icon inverted name='home' /> Home</Menu.Item>
            </Link>
            {authenticated ? (
              <React.Fragment>
                <Link to="/networkLogs">
                  <Menu.Item header><Icon inverted name='connectdevelop' /> Network Logs</Menu.Item>
                </Link>
                <Link to="/dashboard">
                  <Menu.Item header><Icon inverted name='dashboard' /> Dashboard</Menu.Item>
                </Link>
                <Link to="/visualisations">
                  <Menu.Item header><Icon inverted name='line graph' /> Visualisations</Menu.Item>
                </Link>
                <Link to="/notifications">
                  <Menu.Item header><Icon inverted name='bell' /> Notifications</Menu.Item>
                </Link>
                <Link to="/">
                  <Menu.Item header onClick={() => this.props.logout()}>
                    <Icon inverted name='log out' /> Logout
                  </Menu.Item>
                </Link>
              </React.Fragment>
            ) : (
                <React.Fragment>
                  <Link to="/login">
                    <Menu.Item header><Icon inverted name='sign-in' /> Login</Menu.Item>
                  </Link>
                  <Link to="/signup">
                    <Menu.Item header><Icon inverted name='signup' /> Signup</Menu.Item>
                  </Link>
                  {/* <Link to="/networkLogs">
                    <Menu.Item header><Icon inverted name='connectdevelop' /> Network Logs</Menu.Item>
                  </Link>
                  <Link to="/dashboard">
                    <Menu.Item header><Icon inverted name='dashboard' /> Dashboard</Menu.Item>
                  </Link>
                  <Link to="/visualisations">
                    <Menu.Item header><Icon inverted name='line graph' /> Visualisations</Menu.Item>
                  </Link>
                  <Link to="/notifications">
                    <Menu.Item header><Icon inverted name='bell' /> Notifications</Menu.Item>
                  </Link> */}
                </React.Fragment>
              )}
          </Container>
        </Menu>

        {this.props.children}

        <Segment
          inverted
          vertical
          style={{ margin: "5em 0em 0em", padding: "5em 0em" }}
        >
          <Container textAlign="center">
            <Grid divided inverted stackable>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="Group Members" />
                <List link inverted>
                  <List.Item as="a">Shruti Houji</List.Item>
                  <List.Item as="a">Rhishabh Hattarki</List.Item>
                  <List.Item as="a">Sahil Dixit</List.Item>
                  <List.Item as="a">Sanika Patil</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="PRN Number" />
                <List link inverted>
                  <List.Item as="a">71707035C</List.Item>
                  <List.Item as="a">71707027B</List.Item>
                  <List.Item as="a">71706924K</List.Item>
                  <List.Item as="a">71707451L</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="Guide" />
                <List link inverted>
                  <List.Item as="a">M. R. Dhage</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={7}>
                <Header style={{ paddingTop: '3em' }} inverted as="h4" content="Anomaly Based Intrusion Detection System For IoT Networks Using Random Forest" />
              </Grid.Column>
            </Grid>

            <Divider inverted section />
            {/* <Image centered size="mini" src="/logo.png" /> */}
            <List horizontal inverted divided link size="small">
              <List.Item as="a" href="https://github.com/s3r-be/be-project" target='_blank'>
                Click here to check the code on Github
              </List.Item>
            </List>
          </Container>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomLayout)
);
