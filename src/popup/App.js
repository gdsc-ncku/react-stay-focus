import React, { Component } from 'react';
import { getFlatListOfWebsites, getHostNameFromStringUrl, isValidURL, setIcon } from "../helpers";
import { getChromeActiveTab, localStorage, openChromeNewTab } from "../chromeApiHelpers";
import SharedCard from "../sharedComponents/SharedCard";
import { getSiteGroupStructure, getSiteStructure } from "../dataHelpers/SitesGroup";
import { Switch, Button, Card, Badge } from '@mui/material';
// import SocialMediaShare from "../sharedComponents/SocialMediaShare";

import styled from 'styled-components';

const Mycard = styled(Card)`
    margin-top: 8px;
    margin-bottom: 8px;
`

export default class App extends Component {
    saveActive() {};
    setWebsiteName() {};

    constructor(props) {
        super(props)
        this.state = {
            active: true,
            website: "",
            isLocked: false,
            websiteIsAddedBefore: false
        };
    }
    componentDidMount() {
        localStorage.get("active")
            .then(active1 => {
            this.setState({ active: active1 })
            console.log("active 1", active1);
            })
            .catch((error) => {
                console.error("獲取資料失敗ha ha:", error);
                // 在這裡可以處理錯誤情況
            });
        localStorage.get("settings").then(settings => {
          this.setState({ isLocked: (settings.lock.type !== "none") })
        })
        this.setWebsiteName()
    };

    isValidUrl = isValidURL(this.websiteName);

    openOptionsPage = () => {
        openChromeNewTab("options/options.html");
    };

    saveActive(active) {
        localStorage.set("active", active);
        localStorage.get("active")
            .then(active1 => {
            console.log("active is getting", active1);
            })
        // setIcon(active);
    };

    addCurrentWebsite = () => {
        localStorage.get("sitesGroups").then(sitesGroups => {
            let addedFromPopupSiteGroup = sitesGroups.find(sg => sg.uid === "added-from-popup-uid");
            if (!addedFromPopupSiteGroup) {
                addedFromPopupSiteGroup = getSiteGroupStructure("Added From Popup", true, [], "added-from-popup-uid");
                sitesGroups.push(addedFromPopupSiteGroup);
            }
            addedFromPopupSiteGroup.sitesList = [getSiteStructure(this.websiteName), ...addedFromPopupSiteGroup.sitesList]
            localStorage.set("sitesGroups", sitesGroups);
            this.WebsiteIsAddedBefore = true;
        });
    };

    setWebsiteName = () => {
        getChromeActiveTab().then(tab => {
            const website = getHostNameFromStringUrl(tab.url);
            localStorage.get("sitesGroups").then(sitesGroups => {
                this.websiteIsAddedBefore = getFlatListOfWebsites(sitesGroups).some(site => site.url === this.websiteName);
            });
        });
    };

    handlchange = (active) => {
        this.setState({active: !active});
    }

    render() {
    return (
        <div>
            <header>
                <img src="../images/logo-red-white.png" alt="Logo" />
                <span id="settings-page-btn" onClick={this.openOptionsPage}></span>
            </header>
            <main>
                <SharedCard>
                    {this.state.isLocked && this.state.active && (
                        <div className="main-row center" >
                            <p>Focus mode is enabled, and you have set lock mechanism to unlock</p>
                            <Button id="unlock-btn" className="md-raised md-accent" onClick={this.openOptionsPage}>Unlock</Button>
                        </div>
                        )
                    }

                    {!(this.state.isLocked && this.state.active) && (
                        
                        <div className="main-row">
                            <p><b>Focus Mode enabled?</b></p>
                            <p>
                            <Switch type="checkbox" className="button" checked={this.state.active} onChange={(e) => {this.saveActive(e.target.checked), this.handlchange(this.state.active)}}/>
                            </p>
                        </div>
                        )
                    }
                </SharedCard>
                <SharedCard>
                    {isValidURL && (
                        <div className="main-row">
                            <div><b>Website: </b>{this.websiteName}</div>
                            {!this.websiteIsAddedBefore && (
                                <div>
                                    <Button onClick={this.addCurrentWebsite} className="md-raised md-accent">
                                        Add Website
                                    </Button>
                                </div>
                            )}
                            {!!this.websiteIsAddedBefore && (
                                <Badge class="md-square md-primary" content="Already Added"/>
                            )}
                    </div>
                    )}
                </SharedCard>
            </main>
        </div>
        
    )
    }
};
