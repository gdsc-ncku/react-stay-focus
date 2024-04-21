import React, { Component } from 'react';

class PasswordUnlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            showErrorMessage: false,
        };
    }

    handleUnlock = () => {
        if (this.state.password.toLowerCase() === this.props.lockSettings.password.toLowerCase()) {
            this.props.handleUnlock();
        } else {
            this.setState({ showErrorMessage: true });
        }
    };

    render() {
        return (
            <div>
                <div>
                    {this.props.lockSettings.password === '' ? (
                        <div>
                            <p>You haven't set a password yet! go to setting to set it.</p>
                            <button onClick={this.props.handleUnlock}>Go To setting</button>
                        </div>
                    ) : (
                        <div>
                            <label>Enter Password</label>
                            <input value={this.state.password} onChange={e => this.setState({ password: e.target.value })} onKeyUp={e => e.key === 'Enter' && this.handleUnlock()} />
                        </div>
                    )}
                </div>

                {this.state.showErrorMessage && <div>Wrong Password!</div>}
            </div>
        );
    }
}

export default PasswordUnlock;