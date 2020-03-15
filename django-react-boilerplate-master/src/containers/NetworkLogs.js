import React from "react";
import { connect } from "react-redux";
import {
    Container,
    Segment
} from "semantic-ui-react";
import { func } from "prop-types";

// var roomName = 'lobby';
// // create websocket
// var chatSocket = new WebSocket(
//     'ws://' + window.location.host +
//     '/ws/chat/' + roomName + '/');

// // on receiving message
// chatSocket.onmessage = function (e) {
//     var data = JSON.parse(e.data);
//     // var message = '';
//     // data.forEach(element => {
//     //     message += element + '';
//     // });
//     console.log(data);
// };

// // on closing web socket
// chatSocket.onclose = function (e) {
//     console.error('Chat socket closed unexpectedly');
// };

// // test function that sends message: hello
// var testFn = function () {
//     chatSocket.send(JSON.stringify({
//         'message': 'hello'
//     }));
// }

class TestClass extends React.Component {

    roomName = 'lobby';
    chatSocket = new WebSocket(
        'ws://' + window.location.host +
        '/ws/chat/' + this.roomName + '/');

    // test function that sends message: hello
    testFn = () => {
        this.chatSocket.send(JSON.stringify({
            'message': 'hello'
        }));
    }

    componentDidMount() {
        // on receiving message
        this.chatSocket.onmessage = (e) => {
            var data = JSON.parse(e.data);
            // var message = '';
            // data.forEach(element => {
            //     message += element + '';
            // });
            console.log(data);
        };

        // on closing web socket
        this.chatSocket.onclose = (e) => {
            console.error('Chat socket closed unexpectedly');
        };
    }

    render() {
        return (
            <Container>
                <Segment style={{ padding: "8em 0em" }} vertical>
                    Hello
                    </Segment>

                <Segment>
                    <button onClick={this.testFn}>
                        click
                        </button>
                </Segment>
            </Container>
        );
    }
}

export default connect(
)(TestClass);