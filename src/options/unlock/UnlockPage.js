import React, { Component } from 'react';
import { getSettings } from '../../chromeApiHelpers';
import QuestionUnlock from './QuestionUnlock';
import PasswordUnlock from './PasswordUnlock';
import ClickButtonUnlock from './ClickButtonUnlock';
import CardWithLogo from '../../sharedComponents/CardWithLogo';
import { localStorage, setLocalStorage } from "../../chromeApiHelpers";

export default class UnlockPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lockSettings: {}
    }
  }

  componentDidMount() {
    localStorage.get("settings").then(settings => {
      this.setState({lockSettings : settings.lock});
      console.log("lockSettings", this.state.lockSettings);
    })
  }

  handleUnlock() {
    localStorage.set("active", false);
    // this.$emit('unlock');
  }

  lockComponentName() {
    console.log("jfisdfj", this.state.lockSettings);
    return this.state.lockSettings.type + "-unlock"
  }
  
  render() {
  return (
    <CardWithLogo>
      {this.state.lockSettings.type && this.lockComponentName() === "password-unlock" && (
          <div>Password</div> 
          // <PasswordUnlock />
      )}

      {this.state.lockSettings.type && this.lockComponentName() === "question-unlock" && (
          <QuestionUnlock />
      )}

      {this.state.lockSettings.type && this.lockComponentName() === "click-button-unlock" && (
          <ClickButtonUnlock />
      )}
    </CardWithLogo>
  )};
};
