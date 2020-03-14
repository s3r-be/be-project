import React from "react";
import { connect } from "react-redux";
import {
    Container,
    Segment
} from "semantic-ui-react";
import { func } from "prop-types";

var roomName = 'lobby';
var chatSocket = new WebSocket(
    'ws://' + window.location.host +
    '/ws/chat/' + roomName + '/');

chatSocket.onmessage = function (e) {
    var data = JSON.parse(e.data);
    var message = data['message'];
    var message2 = data['message2'];
    console.log(message + message2);
};

chatSocket.onclose = function (e) {
    console.error('Chat socket closed unexpectedly');
};

var testFn = function () {
    chatSocket.send(JSON.stringify({
        'message': 'hello'
    }));
}

class TestClass extends React.Component {

    render() {
        return (
            <Container>
                <Segment style={{ padding: "8em 0em" }} vertical>
                    Hello
                </Segment>

                <Segment>
                    <button onClick={testFn}>
                        click
                    </button>
                </Segment>
            </Container>
        );
    }
}

export default connect(
)(TestClass);