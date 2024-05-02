import React from 'react';
import { truncateText } from "../../helpers";
import AddBlockItemToList from "./AddBlockItemToList";
import Tooltip from "../../sharedComponents/Tooltip";
import { blockTypes } from "../../constants";
import { Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
import Switch from '@mui/material/Switch';
import { SwitchCamera } from '@mui/icons-material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import './BlockItemBaseTab.css';

class SitesGroup extends React.Component {
    constructor(props) {
        console.log("excecuted")
        super(props);
        this.state = {
            sitesGroup: props.sitesGroup,
            allowDelete: props.allowDelete || true
        }
    }

    truncateSiteUrl(siteUrl) {
        return truncateText(siteUrl, 15);
    }

    render() {
        return (
            <div className="site-group">
            <Card style={{borderRadius: '4px'}}>
                
                <CardHeader className="card-header" title={this.state.sitesGroup.groupName} 
                            action={
                                <Switch checked={this.state.sitesGroup.groupEnabled} 
                                    onChange={() => {
                                        this.setState(prevState => ({
                                            sitesGroup: {
                                                ...prevState.sitesGroup,
                                                groupEnabled: !prevState.sitesGroup.groupEnabled
                                            }
                                        }), () => {
                                            this.props.storeWebsites();
                                        });
                                    }}/>
                                }/>
                <CardContent>
                        {this.state.sitesGroup.sitesList.map(site => {
                            return (
                                <div key={site.uid} className="site-item">
                                    {/* <Tooltip title={site.url}>
                                        <span>{this.truncateSiteUrl(site.url)}</span>
                                    </Tooltip> */}
                                    <span className="block-type">{blockTypes[site.blockType]}</span>
                                </div>
                            );
                        })}
                    <AddBlockItemToList blockType={this.state.sitesGroup.blockType} addNewWebsite={this.props.addNewWebsite}/>
                    <FormGroup>
                    {this.state.sitesGroup.sitesList.map((site, siteIndex) =>
                        <FormControlLabel
                            control={
                            <Switch className='md-primary' checked={site.enabled}
                                onChange={() => {
                                    let sitesGroup = this.state.sitesGroup;
                                    sitesGroup.sitesList[siteIndex].enabled = !sitesGroup.sitesList[siteIndex].enabled;
                                    this.setState({sitesGroup: sitesGroup}, () => {
                                        this.props.storeWebsites();
                                    });
                                }}/>}
                                label={this.truncateSiteUrl(site.url)}
                        />
                    )}
                    </FormGroup>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={this.props.deleteSitesGroup}>DELETE GROUP</Button>
                </CardActions>
            </Card>
            </div>
        );
    }
}

export default SitesGroup;
