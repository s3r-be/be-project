import React from "react";
import { connect } from "react-redux";

class TestClass extends React.Component {
    render() {
        return (
            <div>
                <h1>hello</h1>
            </div>
        );
    }
}

export default connect(
)(TestClass);