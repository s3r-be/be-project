import React from 'react';
import Background_car from '../Images/Dashboard/bg1.jpg';
import img from '../Images/Dashboard/car2.png';
import Background_alarm from '../Images/Dashboard/babg1.png';
import { connect } from "react-redux";
import { Segment, Header, Icon, Menu, Container, Button, Grid, Portal, Label } from "semantic-ui-react";
var BurglerAlerts_Log = "";
var BurglerAlerts_Count = 0;
var movingAvg = [];
var smoothingWindow = 10;
var movingArray = [];
var threshold = 300;
// var imgUrl;
class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeItem: true,                                               //To select item from menu: true for car, false for BA  
            node_pos_alarm: 0,
            open: false,                                                    //Used for alarm module. If true => motion detected within threshold
            time: new Date().toLocaleString(),
            pos_car: 0,
            node_pos_car: 0
        }
        this.phpSocket = this.props.phpSocket;
    }

    componentDidMount() {

        this.phpSocket.onopen = (e) => {
            this.phpSocket.send(JSON.stringify({                            // send message to initiate notification data transfer
                'message': 'initiate node data transfer'
            }))
        }
        this.phpSocket.onmessage = (e) => {
            this.writearray_alarm(e.data);
            this.writearray_car(e.data);
        };
        this.phpSocket.onclose = (e) => {
            console.error('Php socket closed unexpectedly');
        };
    }
    ActiveCar = () => {                                                     //if activeItem = true => Car
        this.setState({ activeItem: true });
    }

    ActiveBA = () => {                                                      //if activeItem = false => Burgler Alarm
        this.setState({ activeItem: false });
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    changeState() {
        if (!this.state.open && !this.state.activeItem) {                      //if open is false and activeItem is false
            // this.state.open = true;
            this.setState({ open: true })
            // this.setState({});
        }
    }

    clearLog = () => {
        BurglerAlerts_Log = " ";
        BurglerAlerts_Count = 0;
    };
    writeLog = (data) => {
        BurglerAlerts_Log = this.state.time + data + BurglerAlerts_Log;   //concatenate to previous log 
        BurglerAlerts_Count++;
    }
    writearray_alarm = (d) => {

        d = d.split('\n');
        d.splice(-1, 1);                                                     //to remove last element. As it is splitting using \n 1 extra empty element willl be added
        d = Number(d[d.length - 1]);                                          //because last element is the new incoming element
        movingArray.push(d)                                                 // append to array

        if (movingArray.length >= smoothingWindow) {
            movingArray.shift();                                            // removes first value if length reaches smoothing window (eg 10)
        }
        var tempVar = 0;
        movingArray.forEach(element => {
            tempVar = element;
        });

        if (tempVar > 400) {
            tempVar = 400;
        }
        if (!this.state.activeItem) {
            this.setState({
                node_pos_alarm: tempVar
            });
        }
    }

    writearray_car = (d1) => {

        d1 = d1.split('\n');
        d1.splice(-1, 1);                                                 //to remove last element. As it is splitting using \n 1 extra empty element willl be added
        d1 = Number(d1[d1.length - 1]);                                    //because last element is the new incoming element
        movingAvg.push(d1)                                               // append to array

        if (movingAvg.length >= smoothingWindow) {
            movingAvg.shift();                                          // removes first value if length reaches smoothing window (eg 10)
        }
        // get sum
        var tempAvg = 0;
        movingAvg.forEach(element => {
            tempAvg += element;
        });
        tempAvg /= movingAvg.length;                                    // get average
        if (tempAvg > 400) {                                            // condition for tempAvg going beyond threshold
            tempAvg = 400;
        }
        if (this.state.activeItem) {
            this.setState({
                node_pos_car: tempAvg
            });
        }
        tempAvg = (800 * tempAvg) / 400;                                  //Formula to map node data on screen. Movement space on screen is maximum 800 px.

        if (this.state.activeItem) {
            this.setState({
                pos_car: tempAvg
            });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.node_pos_alarm < threshold && this.state.node_pos_alarm !== prevState.node_pos_alarm) {
            this.changeState();
            if (this.state.open !== prevState.open && this.state.open === true)  //when state.open goes from false to true means this is the first instance of movement detected within threshold. So print entry in Event Log only this one time.
            {
                this.writeLog("  Motion Detected at " + this.state.node_pos_alarm / 100 + " meters.\n");
            }
        }

    }
    render() {
        const { open } = this.state;
        var imgUrl = this.state.activeItem ? Background_car : Background_alarm;      //if activeItem = true => Car =>Car background
        var add_border = this.state.activeItem ? null : (this.state.open ? "inset 0px 0px 2px 30px red" : null);  //if open = true => movement detected => add border

        var sectionStyle = {
            width: "100%",
            height: "900px",
            backgroundImage: 'url(' + imgUrl + ')',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: 'center',
            boxShadow: add_border,
            paddingLeft: "0px"
        };
        return (
            <div>

                <Segment style={{ marginTop: '4em', textAlign: "center" }} vertical>
                    <Header as='h3'>
                        <Icon name='dashboard' />Dashboard
                </Header>
                </Segment>


                <Menu pointing>
                    <Menu.Item
                        name='Car'
                        onClick={this.ActiveCar}
                    />
                    <Menu.Item
                        name='Burgler Alarm'
                        onClick={this.ActiveBA}
                    />
                </Menu>

                <Container fluid>

                    {this.state.activeItem ? (                              //if activeItem = True => Car
                        //.........................................................Start of Car Module.........................
                        <React.Fragment>
                            <div style={sectionStyle}>
                                <div >
                                    <img src={img} alt="car" width="600" style={{ top: "650px", right: this.state.pos_car + 250 + "px", position: "absolute" }} />
                                </div>
                                <h1 style={{ 'background-color': '#FFFF00' }}>Position = {this.state.pos_car} Node Position = {this.state.node_pos_car}</h1>
                            </div>

                        </React.Fragment>
                        //..........................................................End of Car module..............................
                    ) : (
                            //.........................................................Start of Alarm Module.........................
                            <React.Fragment>
                                <div>
                                    <Grid columns={2} divided>
                                        <Portal open={open}>
                                            <Segment
                                                style={{
                                                    left: '40%',
                                                    position: 'fixed',
                                                    top: '50%',
                                                    zIndex: 1000,
                                                }}
                                            >
                                                <Header>Intruder Alert</Header>
                                                <p>The time is {Date().toLocaleString()}.</p>
                                                <p>Movement detected at distance of {this.state.node_pos_alarm / 100} meters. </p>

                                                <Button
                                                    content='Reset'
                                                    negative  //red color
                                                    onClick={this.handleClose}
                                                />
                                            </Segment>
                                        </Portal>
                                        <Grid.Column style={{ left: '0.5%', width: '30%', }}>
                                            <Segment.Group>
                                                <Segment>
                                                    <Button
                                                        compact
                                                        size="small"
                                                        floated="right"
                                                        onClick={this.clearLog}
                                                    >
                                                        Clear
                            </Button>
                            Event Log <Label circular>{BurglerAlerts_Count}</Label>
                                                </Segment>
                                                <Segment secondary>
                                                    <pre>
                                                        {BurglerAlerts_Log}
                                                    </pre>
                                                </Segment>
                                            </Segment.Group>
                                        </Grid.Column>

                                        <Grid.Column style={{ width: '70%' }}>
                                            <div style={sectionStyle}>
                                            </div>
                                        </Grid.Column>
                                    </Grid>
                                    <h1 style={{ 'background-color': '#FFFF00' }}> Node Position = {this.state.node_pos_alarm}</h1>
                                </div>
                            </React.Fragment>
                            //......................................................End of Alarm module..................................
                        )}
                </Container>
            </div>
        );
    }
}

export default connect(
)(Dashboard);
