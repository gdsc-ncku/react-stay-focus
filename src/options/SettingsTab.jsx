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
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { InputLabel, Select, MenuItem } from '@material-ui/core';
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';


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

    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    handleChange = (event) => {
        this.setState((prevState) => ({settings: {
          ...prevState.settings,
          workHours: {
              ...prevState.settings.workHours,
              days: event.target.value
          }
      }}));
      };

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
                    
                <Card>

                    <h4>Working Days and Hours
                        {/* <Tooltip>
                        Specifying working hours, so the websites will be blocked in these days/hours
                        </Tooltip> */}
                    </h4>
                    <NoteBlock>
                         Note: You have to activate the tool too, to make it works in working hours/days
                    </NoteBlock>
                    
                    <FormControlLabel control={
                        <Switch type="checkbox" className="md-menu-content-right-end md-primary"
                        checked={this.state.settings.workHours.enableWorkHours} 
                        onChange={() => {this.setState(prevState => ({
                           settings: {
                               ...prevState.settings,
                               workHours: {
                                   ...prevState.settings.workHours,
                                   enableWorkHours: !prevState.settings.workHours.enableWorkHours
                               }
                           }
                       }));
                       }}/>
                    } label="Active?" />

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        From:
                        <TimePicker
                        label="Uncontrolled picker"
                        defaultValue={dayjs('2022-04-17T08:00')}
                        disabled={!this.state.settings.workHours.enableWorkHours}
                        value={dayjs(this.state.settings.workHours.startTime, "hh:mm A")}
                        onChange={(v) => {
                            this.setState(prevState => ({
                                settings: {
                                    ...prevState.settings,
                                    workHours: {
                                        ...prevState.settings.workHours,
                                        startTime: v
                                    }
                                }
                            }));
                        }}
                        />

                        To:
                        <TimePicker
                        label="Uncontrolled picker"
                        defaultValue={dayjs('2022-04-17T08:00')}
                        disabled={!this.state.settings.workHours.enableWorkHours}
                        value={dayjs(this.state.settings.workHours.endTime, "hh:mm A")}
                        onChange={(v) => {
                            this.setState(prevState => ({
                                settings: {
                                    ...prevState.settings,
                                    workHours: {
                                        ...prevState.settings.workHours,
                                        endTime: v
                                    }
                                }
                            }));
                        }}
                        />
                    </LocalizationProvider>

            <div>
                <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="working-days-label">Working Days</InputLabel>
                <Select
                    labelId="working-days-label"
                    id="working-days"
                    multiple
                    value={this.state.settings.workHours.days}
                    onChange={this.handleChange}
                    input={<OutlinedInput label="Working Days" />}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {this.days.map((day, index) => (
                    <MenuItem key={index} value={day}>
                        <Checkbox checked={this.state.settings.workHours.days.indexOf(day) > -1} />
                        <ListItemText primary={day} />
                    </MenuItem>
                    ))}
                </Select>
                </FormControl>
            </div>
                {isResetButtonActive && (
                    <div className="md-dialog-confirm" style={{display: 'block'}}>
                        <div className="md-title">Are you sure you want to reset the data?</div>
                        <div className="md-content">This will make all your settings and websites return to their initial values.</div>
                        <button className="md-confirm" onClick={() => this.onResetConfirm()}>Yes</button>
                        <button className="md-cancel" onClick={() => this.setState({ isResetButtonActive: false })}>No</button>
                    </div>
                )}
                </Card>

                <Card>
                <FormControlLabel control={
                        <Switch type="checkbox" className="md-menu-content-right-end md-primary"
                        checked={this.state.settings.allowFunnyGoBackImages} 
                        onChange={() => {this.setState(prevState => ({
                           settings: {
                               ...prevState.settings,
                               allowFunnyGoBackImages : !prevState.settings.allowFunnyGoBackImages
                           }
                       }));
                       }}/>
                    } label="Show funny images to go back to work" />
                </Card>
            </div>
        );
    }
}

export default SettingsTab;
