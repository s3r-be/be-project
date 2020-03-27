import React from "react";
import model from "../Images/Visualisations/model.png";
import Matrix from "../Images/Visualisations/normalized_confusion.png";
import Corr from "../Images/Visualisations/Correlation.png";
import WithOverProtocolI from "../Images/Visualisations/pOversampled.png";
import WithoutOverProtocolI from "../Images/Visualisations/protoc.png";
import toa from "../Images/Visualisations/TypeofAttacks.png";
import Otoa from "../Images/Visualisations/Oversampling.png";
import main from "../Images/Visualisations/main.png";
import { connect } from "react-redux";
import {
    Button,
    Container,
    Segment
} from "semantic-ui-react";


class Visualisations extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            path: main
        }
    }
    Disable = () => {
        this.setState({ path: main });
    }
    ModelComparison = () => {
        this.setState({ path: model });
        // console.log(this.state.path)
    }
    ConfusionMatrix = () => {
        this.setState({ path: Matrix });
        // console.log(this.state.path)
    }
    Correction = () => {
        this.setState({ path: Corr });
        // console.log(this.state.path)
    }
    WithoutOverProtocol = () => {
        this.setState({ path: WithoutOverProtocolI });
        // console.log(this.state.path)
    }
    WithOverProtocol = () => {
        this.setState({ path: WithOverProtocolI });
        // console.log(this.state.path)
    }
    OAttackDis = () => {
        this.setState({ path: Otoa });
        // console.log(this.state.path)
    }
    AttackDis = () => {
        this.setState({ path: toa });
        // console.log(this.state.path)
    }
    render() {
        return (
            <Container>
                <div>
                    <Button style={{ size: "10" }} onClick={this.Disable}> Disable</Button>
                    <h2 style={{ fontFamily: "Trebuchet MS", fontSize: "50px", color: "Grey", textAlign: "center" }}>Visualisations</h2>
                </div>

                <Segment style={{ padding: "0.5em 0.1em" }} horizontal>
                    <Button onClick={this.ModelComparison}>Model Comparison</Button>
                    <Button onClick={this.ConfusionMatrix}>Confusion Matrix</Button>
                    <Button onClick={this.Correction}>Correlation Matrix</Button>
                    <Button onClick={this.WithOverProtocol}>Types of Protocol(Oversampled)</Button>
                    <Button onClick={this.WithoutOverProtocol}>Types of Protocol</Button>
                    <Button onClick={this.OAttackDis}>Types Of Attacks(Oversampled)</Button>
                    <Button onClick={this.AttackDis}>Types Of Attacks</Button>
                </Segment>
                <Segment>
                    <img src={this.state.path} alt=""></img>
                </Segment>
            </Container >
        );
    }
}

export default connect(
)(Visualisations);