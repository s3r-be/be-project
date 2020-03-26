import React from "react";
import { connect } from "react-redux";
import {
    Container,
    Segment,
    Table
} from "semantic-ui-react";

class NetworkLogs extends React.Component {

    constructor(props) {
        super(props)
        this.chatSocket = this.props.chatSocket;
        this.state = {
            netLogs: []
        }
    }

    createTable = () => {
        let table = []
        let headers = [];

        // add headers to the table - column headings
        headers.push(<Table.HeaderCell>Frame Number</Table.HeaderCell>);
        headers.push(<Table.HeaderCell>Frame time</Table.HeaderCell>);
        table.push(<Table.Header><Table.Row>{headers}</Table.Row></Table.Header>);

        // Outer loop to create parent
        for (let i = 0; i < this.state.netLogs.length; i++) {
            let children = []
            // push children - add column values here
            children.push(<Table.Cell>{this.state.netLogs[i]['frame.number']}</Table.Cell>)
            children.push(<Table.Cell>{this.state.netLogs[i]['frame.time']}</Table.Cell>)
            //Create the parent and add the children
            table.push(<Table.Body><Table.Row children={children} /></Table.Body>)
        }

        return table
    }

    componentDidMount() {

        // on receiving message
        this.chatSocket.onmessage = (e) => {
            var data = JSON.parse(e.data);
            // appending received message to state
            this.setState(prevState => ({
                netLogs: [...prevState.netLogs, data]
            }))
            console.log(data);
            console.log('state netLogs: ', this.state.netLogs);
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
                    <Table celled>
                        {this.createTable()}
                    </Table>
                </Segment>
            </Container>
        );
    }
}

export default connect(
)(NetworkLogs);