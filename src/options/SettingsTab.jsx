import React, { Component } from 'react';
import { settingsDefault } from '../defaults';
import { resetChromeStorageData } from '../helpers';
import { localStorage } from "../chromeApiHelpers";
import SharedCard from "../sharedComponents/SharedCard";
import Tooltip from "../sharedComponents/Tooltip";
import MdColumn from "../sharedComponents/MdColumn";
import NoteBlock from "../sharedComponents/NoteBlock";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Card from '@mui/material/Card';
import Switch from '@mui/material/Switch';

class SettingsTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            settings: settingsDefault,
            isResetButtonActive: false
        };
    }

    componentDidMount() {
        this.loadSettings();
    }

    loadSettings() {
        localStorage.get("settings")
            .then(savedSettings => {
                this.setState({ settings: savedSettings });
            })
            .catch(e => {
                this.saveSettings(); // Save default settings if none found
            });
    }

    saveSettings() {
        localStorage.set("settings", this.state.settings);
    }

    onResetConfirm() {
        resetChromeStorageData();
        this.props.reloadData(); //
        this.loadSettings();
    }

    handler() {
        this.saveSettings()
    }

    render() {
        const { settings, isResetButtonActive } = this.state;

        return (
            <div>
                <Card>
                    <h4>Lock type</h4>
                    <NoteBlock>
                        Note: The idea behind this is to make deactivating the extension needs some time, so you might prefer to continue working instead of deactivating it.
                    </NoteBlock>
                    
                    <FormControl>
                        <RadioGroup
                            defaultValue="None"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="none" control={<Radio />} label="None" />
                            <FormControlLabel value="question" control={<Radio />} label="Answering a Question" />
                            <FormControlLabel value="password" control={<Radio />} label="Password" />
                            <FormControlLabel value="click-button" control={<Radio />} label="Click a Button" />
                        </RadioGroup>
                     </FormControl>
                    {settings.lock.type === 'question' && (
                        <MdColumn>
                            <label>Number of tries before showing answer</label>
                            <input type="number" min="1" value={settings.lock.questionNumberOfTries} onChange={(e) => this.setState({ settings: {...settings, lock: {...settings.lock, questionNumberOfTries: parseInt(e.target.value)}} })} />
                        </MdColumn>
                    )}
                    {/* Similar rendering logic for other lock types */}
                </Card>

                {/* Similar rendering logic for other sections */}

                    <h4>Working Days and Hours
                        {/* <Tooltip>
                        Specifying working hours, so the websites will be blocked in these days/hours
                        </Tooltip> */}
                    </h4>

                {isResetButtonActive && (
                    <div className="md-dialog-confirm" style={{display: 'block'}}>
                        <div className="md-title">Are you sure you want to reset the data?</div>
                        <div className="md-content">This will make all your settings and websites return to their initial values.</div>
                        <button className="md-confirm" onClick={() => this.onResetConfirm()}>Yes</button>
                        <button className="md-cancel" onClick={() => this.setState({ isResetButtonActive: false })}>No</button>
                    </div>
                )}
            </div>
        );
    }
}

export default SettingsTab;
