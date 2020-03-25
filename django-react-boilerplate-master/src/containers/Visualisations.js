import React from "react";
import { connect } from "react-redux";
import {
    Container,
    Segment
} from "semantic-ui-react";

class Visualisations extends React.Component {
    render() {
        return (
            <Container>
                <Segment style={{ padding: "8em 0em" }} vertical>
                    Visualisations
                </Segment>
            </Container>
        );
    }
}

export default connect(
)(Visualisations);