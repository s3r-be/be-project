import React from "react";
import { connect } from "react-redux";
import {
    Container,
    Segment
} from "semantic-ui-react";

class NetworkLogs extends React.Component {

    constructor(props) {
        super(props)
        this.chatSocket = this.props.chatSocket;
    }

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
)(NetworkLogs);