import React from "react";
import { connect } from "react-redux";
import {
    Container,
    Segment
} from "semantic-ui-react";

class TestClass extends React.Component {
    render() {
        return (
            <Container>
                <Segment style={{ padding: "8em 0em" }} vertical>
                    Hello
                </Segment>
            </Container>
        );
    }
}

export default connect(
)(TestClass);