import React, { Component } from 'react';

class ClickButtonUnlock extends Component {
    constructor(props) {
        super(props);
        console.log("clickbutton props", props);
        this.state = {
            clicksLeft: this.props.lockSettings.clickButtonCounts,
            buttonPositionStyle: { textAlign: "center" }
        };
    }

    handleClick = () => {
        console.log("clicksLeft prev", this.state.clicksLeft);
        this.setState({ clicksLeft: this.state.clicksLeft - 1 }, () => {
            if (this.state.clicksLeft <= 0) {
                this.props.handleUnlock();
                console.log("unlock invoked")
            }
            console.log("clicksLeft", this.state.clicksLeft);
        });
        this.updateButtonPosition();
    };

    updateButtonPosition = () => {
        const availablePositions = ['center', 'left', 'right'];
        this.setState({
            buttonPositionStyle: {
                textAlign: availablePositions[Math.floor(Math.random() * availablePositions.length)]
            }
        });
    };

    render() {
        return (
            <div>
                <div className="md-layout">
                    <div style={this.state.buttonPositionStyle} className="md-layout-item">
                        <button onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') e.preventDefault(); }} onClick={this.handleClick} className="md-raised md-accent">
                            {this.state.clicksLeft} clicks to unlock
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ClickButtonUnlock;
