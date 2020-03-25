import React from "react";
import { connect } from "react-redux";
import {
    Container,
    Segment,
    Table
} from "semantic-ui-react";

class Notifications extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        const notifList = this.props.notifList;
        console.log('notif list in notifications.js', notifList);
    }

    createTable = () => {
        let table = []
        let headers = [];
        // add headers to the table
        headers.push(<Table.HeaderCell>ID</Table.HeaderCell>);
        headers.push(<Table.HeaderCell>Message</Table.HeaderCell>);
        table.push(<Table.Header><Table.Row>{headers}</Table.Row></Table.Header>);
        // Outer loop to create parent
        for (let i = 0; i < this.props.notifList.length; i++) {
            let children = []
            children.push(<Table.Cell>{this.props.notifList[i].id}</Table.Cell>)
            children.push(<Table.Cell>{this.props.notifList[i].message}</Table.Cell>)
            //Create the parent and add the children
            table.push(<Table.Body><Table.Row children={children} /></Table.Body>)
        }
        return table
    }

    render() {
        return (
            <Container>
                <Segment style={{ padding: "8em 0em" }} vertical>
                    Notifications
                </Segment>
                <Segment>
                    <Table celled>
                        {this.createTable()}
                    </Table>
                </Segment>
            </Container>
        );
    }
}

export default connect(
)(Notifications);