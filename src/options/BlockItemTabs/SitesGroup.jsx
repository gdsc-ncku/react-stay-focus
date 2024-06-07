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
import Box from '@mui/material/Box';
import { localStorage } from '../../chromeApiHelpers.js';
import './BlockItemBaseTab.css';

class SitesGroup extends React.Component {
    constructor(props) {
        console.log("excecuted")
        super(props);
        this.state = {
            sitesGroup: props.sitesGroup,
            allowDelete: props.allowDelete || true, 
            'facebook.com': 65
        }
        this.storageListener();
    }

    componentDidMount() {
        for (let site of this.state.sitesGroup.sitesList) {
            if (site.url != undefined){ this.loadUsage(site.url) }
        }
    }

    loadUsage = (siteUrl) => {
        localStorage.get(siteUrl)
          .then(data => {
            this.setState({ siteUrl: data })
            console.log(siteUrl, data)
          })
          .catch((error) => {
            console.error("getting", siteUrl, "usage: ", error);
          });
      }

    truncateSiteUrl(siteUrl) {
        return truncateText(siteUrl, 15);
    }

    storageListener = () => {

        chrome.storage.onChanged.addListener((changes, namespace) => {
            for (let key in changes) {
                if(!(key in ["active", "settings", "sitesGroups", "version"])){
                    let storageChange = changes[key];
                    console.log(`Storage key "${key}" in namespace "${namespace}" changed. Old value was "${storageChange.oldValue}", new value is "${storageChange.newValue}".`);
                    this.setState({[key]: storageChange.newValue});
                    console.log(this.state);
                }
            }
        });
    }

    render() {
        return (
            <div className="site-group">
            <Card style={{borderRadius: '4px', margin: '10px', height: '500px'}}>
                
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
                    <div style={{height: '300px', overflowY: 'auto'}}><FormGroup>
                    {this.state.sitesGroup.sitesList.map((site, siteIndex) =>
                        <FormControlLabel
                            control={
                            <>
                            <Switch className='md-primary' checked={site.enabled}
                                onChange={() => {
                                    let sitesGroup = this.state.sitesGroup;
                                    sitesGroup.sitesList[siteIndex].enabled = !sitesGroup.sitesList[siteIndex].enabled;
                                    this.setState({sitesGroup: sitesGroup}, () => {
                                        this.props.storeWebsites();
                                    });
                                }}/>
                            <Button size="small" onClick={this.props.deleteSite}>delete</Button>
                            <Box sx={{marginRight: 1}}>{(Math.floor(this.state[site.url] / 60) || 0).toString().padStart(2, '0')}:{(this.state[site.url] % 60 || 0).toString().padStart(2, '0')}</Box>
                            </>
                            }
                                label={this.truncateSiteUrl(site.url)}

                        />
                    )}
                    </FormGroup></div>
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
